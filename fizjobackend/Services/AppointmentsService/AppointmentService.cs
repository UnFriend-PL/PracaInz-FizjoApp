using fizjobackend.DbContexts;
using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Interfaces.AppointmentsInterfaces;
using fizjobackend.Interfaces.BodyVisualizerInterfaces;
using fizjobackend.Models.AppointmentsDTOs;
using fizjobackend.Models.BodyVisualizerDTOs;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace fizjobackend.Services.AppointmentsService
{
    public class AppointmentService : IAppointmentsService
    {
        private readonly FizjoDbContext _context;
        private readonly ILogger<AppointmentService> _logger;
        private readonly IBodyVisualizerService _bodyVisualizerService;

        public AppointmentService(FizjoDbContext context, ILogger<AppointmentService> logger, IBodyVisualizerService bodyVisualizerService)
        {
            _context = context;
            _logger = logger;
            _bodyVisualizerService = bodyVisualizerService;
        }

        public async Task<ServiceResponse<bool>> ChangeAppointmentStatus(Guid appointmentId, Guid physiotherapistId, ChangeAppointmentStatusRequestDTO status)
        {
            var apoointment = await _context.Appointments.FindAsync(appointmentId);
            if (apoointment == null)
            {
                return new ServiceResponse<bool>("Appointment not found");
            }
            if (apoointment.PhysiotherapistId != physiotherapistId)
            {
                return new ServiceResponse<bool>("You are not authorized to change status of this appointment");
            }
            apoointment.AppointmentStatus = status.Status;
            await _context.SaveChangesAsync();
            return new ServiceResponse<bool>("Appointment status changed successfully");
        }

        public async Task<ServiceResponse<bool>> EditAppointment(Guid appointmentId, Guid physiotherapistId, EditAppointmentRequestDTO editAppointmentRequest)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(appointmentId);
                if (appointment == null)
                {
                    return new ServiceResponse<bool>("Appointment not found");
                }
                if (appointment.PhysiotherapistId != physiotherapistId)
                {
                    return new ServiceResponse<bool>("You are not authorized to edit this appointment");
                }

                bool isUpdated = false;

                if (!string.IsNullOrEmpty(editAppointmentRequest.AppointmentDescription) &&
                    appointment.AppointmentDescription != editAppointmentRequest.AppointmentDescription)
                {
                    appointment.AppointmentDescription = editAppointmentRequest.AppointmentDescription;
                    isUpdated = true;
                }

                if (editAppointmentRequest.AppointmentDate != default &&
                    appointment.AppointmentDate != editAppointmentRequest.AppointmentDate)
                {
                    appointment.AppointmentDate = editAppointmentRequest.AppointmentDate;
                    isUpdated = true;
                }

                if (!string.IsNullOrEmpty(editAppointmentRequest.Notes) &&
                    appointment.Notes != editAppointmentRequest.Notes)
                {
                    appointment.Notes = editAppointmentRequest.Notes;
                    isUpdated = true;
                }

                if (!string.IsNullOrEmpty(editAppointmentRequest.Diagnosis) &&
                    appointment.Diagnosis != editAppointmentRequest.Diagnosis)
                {
                    appointment.Diagnosis = editAppointmentRequest.Diagnosis;
                    isUpdated = true;
                }

                if (appointment.IsPaid != editAppointmentRequest.IsPaid)
                {
                    appointment.IsPaid = editAppointmentRequest.IsPaid;
                    isUpdated = true;
                }

                if (appointment.Price != editAppointmentRequest.Price)
                {
                    appointment.Price = editAppointmentRequest.Price;
                    isUpdated = true;
                }

                if (editAppointmentRequest.Status != null &&
                    appointment.AppointmentStatus != editAppointmentRequest.Status)
                {
                    appointment.AppointmentStatus = editAppointmentRequest.Status.Value;
                    isUpdated = true;
                }

                if (isUpdated)
                {
                    await _context.SaveChangesAsync();
                }

                var response = new ServiceResponse<bool>("Appointment edited successfully");
                response.Data = true;
                return response;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error editing appointment");
                return new ServiceResponse<bool>($"Error during editing appointment.");
            }
        }

        public async Task<ServiceResponse<AppointmentResponseDTO>> CreateAppointment(CreateAppointmentRequestDTO newAppointmentRequest)
        {
            try
            {
                var serviceResponse = new ServiceResponse<AppointmentResponseDTO>("Appointment created successfully");
                if (newAppointmentRequest.AppointmentDate == DateTime.MinValue ||
                    newAppointmentRequest.PatientId == null || newAppointmentRequest.PhysiotherapistId == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "All fields are required";
                    return serviceResponse;
                }

                if (newAppointmentRequest.PatientId == newAppointmentRequest.PhysiotherapistId)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Patient and Physiotherapist cannot be the same";
                    _logger.LogWarning($"Patient and Physiotherapist cannot be the same - {newAppointmentRequest.PatientId}");
                    return serviceResponse;
                }

                Patient patient = await _context.Patients.FindAsync(newAppointmentRequest.PatientId);
                if (patient == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Patient not found";
                    _logger.LogWarning($"Patient not found - {newAppointmentRequest.PatientId}");
                    return serviceResponse;
                }

                Physiotherapist physiotherapist = await _context.Physiotherapists.FindAsync(newAppointmentRequest.PhysiotherapistId);
                if (physiotherapist == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Physiotherapist not found";
                    _logger.LogWarning($"Physiotherapist not found - {newAppointmentRequest.PhysiotherapistId}");
                    return serviceResponse;
                }

                var newAppointment = new Appointment(newAppointmentRequest)
                {
                    Patient = patient,
                    Physiotherapist = physiotherapist
                };

                var newAppointmentEntry = await _context.Appointments.AddAsync(newAppointment);
                await _context.SaveChangesAsync();

                var patientResponseDto = new PatientAppointmentDetailResponseDTO(patient);
                var physiotherapistResponseDto = new PhysiotherapistAppointmentResponseDTO(physiotherapist);
                AppointmentResponseDTO appointment = new AppointmentResponseDTO(newAppointment, patientResponseDto, physiotherapistResponseDto);
                serviceResponse.Data = appointment;
                return serviceResponse;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating appointment");
                return new ServiceResponse<AppointmentResponseDTO>($"Error during creating appointment.");
            }
        }

        public async Task<ServiceResponse<ListOfAppointmentsResponseDTO>> GetAppointments(Guid userId, AppointmentStatus status, int page)
        {
            var serviceResponse = new ServiceResponse<ListOfAppointmentsResponseDTO>($"{nameof(status)} Appointments");
            try
            {
                _logger.LogInformation("Fetching appointments for userId: {UserId}, status: {Status}", userId, status);
                await VerifyAppointmentStatusForSelectedUser(userId);

                var appointmentsQuery = _context.Appointments
                    .Where(a => (a.PatientId == userId || a.PhysiotherapistId == userId) && a.AppointmentStatus == status);

                if (status == AppointmentStatus.Scheduled)
                {
                    DateTime startTime = DateTime.Now.AddHours(-12);
                    appointmentsQuery = appointmentsQuery.Where(a => a.AppointmentDate >= startTime);
                }

                var totalAppointmentsCount = await appointmentsQuery.CountAsync();
                var appointments = await appointmentsQuery
                    .OrderBy(a => a.AppointmentDate)
                    .Skip(page * 10)
                    .Take(10)
                    .Include(a => a.Patient)
                    .Include(a => a.Physiotherapist)
                    .ToListAsync();

                var preparedAppointments = appointments.Select(appointment =>
                    new AppointmentInListResponseDTO(
                        appointment,
                        appointment.Patient,
                        appointment.Physiotherapist)
                    ).ToList();

                ListOfAppointmentsResponseDTO appointmentsResponse = new ListOfAppointmentsResponseDTO()
                {
                    Appointments = preparedAppointments,
                    CurrentPage = page,
                    TotalPages = (int)Math.Ceiling(totalAppointmentsCount / 10.0),
                    TotalAppointments = totalAppointmentsCount
                };

                serviceResponse.Data = appointmentsResponse;
                return serviceResponse;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting appointments");
                return new ServiceResponse<ListOfAppointmentsResponseDTO>($"Error during getting appointments.");
            }
        }

        private async Task VerifyAppointmentStatusForSelectedUser(Guid userId)
        {
            var pastScheduledAppointments = await _context.Appointments
                .Where(a => a.AppointmentStatus == AppointmentStatus.Scheduled
                            && a.AppointmentDate < DateTime.Now
                            && (a.PatientId == userId || a.PhysiotherapistId == userId))
                .ToListAsync();

            foreach (var appointment in pastScheduledAppointments)
            {
                if (appointment.IsPaid)
                {
                    appointment.AppointmentStatus = AppointmentStatus.Completed;
                }
                else
                {
                    appointment.AppointmentStatus = AppointmentStatus.NoShow;
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<ServiceResponse<AppointmentResponseDTO>> GetAppointmentDetails(Guid userId, Guid appointmentId)
        {
            var serviceResponse = new ServiceResponse<AppointmentResponseDTO>($"Appointment details for {appointmentId}");
            try
            {
                _logger.LogInformation($"Fetching appointment details for userId: {userId}, appointmentId: {appointmentId}", userId, appointmentId);

                var appointment = await _context.Appointments
                    .Include(a => a.Patient)
                    .Include(a => a.Physiotherapist)
                    .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

                if (appointment == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Appointment not found";
                    _logger.LogWarning($"Appointment not found: appointment - {appointmentId}, userId - {userId}");
                    return serviceResponse;
                }

                if (appointment.PatientId != userId && appointment.PhysiotherapistId != userId)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "You are not authorized to view this appointment";
                    _logger.LogWarning($"User not authorized to view appointment - {userId}");
                    return serviceResponse;
                }

                var patientResponseDto = new PatientAppointmentDetailResponseDTO(appointment.Patient);
                var physiotherapistResponseDto = new PhysiotherapistAppointmentResponseDTO(appointment.Physiotherapist);
                AppointmentResponseDTO appointmentResponse = new AppointmentResponseDTO(appointment, patientResponseDto, physiotherapistResponseDto);
                serviceResponse.Data = appointmentResponse;
                return serviceResponse;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting appointment details");
                return new ServiceResponse<AppointmentResponseDTO>($"Error during getting appointment details.");
            }
        }

        public async Task<ServiceResponse<bool>> SaveBodyPartDetails(Guid userId, Guid appointmentId, SaveAppointmentBodyDetailsRequestDTO bodyDetailsToSave)
        {
            var serviceResponse = new ServiceResponse<bool>("Body part details saved successfully");
            try
            {
                var appointment = await _context.Appointments
                    .Include(a => a.AppointmentBodyDetails)
                    .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

                if (appointment == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Appointment not found";
                    _logger.LogWarning($"Appointment not found: appointment - {appointmentId}, userId - {userId}");
                    return serviceResponse;
                }

                if (appointment.PatientId != userId && appointment.PhysiotherapistId != userId)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "You are not authorized to save body details for this appointment";
                    _logger.LogWarning($"User not authorized to save body details for appointment - {userId}");
                    return serviceResponse;
                }

                if (appointment.AppointmentBodyDetails == null)
                {
                    appointment.AppointmentBodyDetails = new List<AppointmentBodyDetails>();
                }

                var currentBodyDetails = appointment.AppointmentBodyDetails.ToList();

                // Add or update body details
                foreach (var bodyDetail in bodyDetailsToSave.BodyDetails)
                {
                    var isAppointmentBodyDetailinDb = await _context.AppointmentBodyDetails
                        .AnyAsync(abd => abd.AppointmentId == appointmentId &&
                                         abd.BodySectionId == bodyDetail.BodySectionId &&
                                         abd.BodySide == bodyDetail.BodySide &&
                                         abd.MuscleId == bodyDetail.MuscleId &&
                                         abd.JointId == bodyDetail.JointId);
                    if (isAppointmentBodyDetailinDb) continue;

                    var appointmentBodyDetail = new AppointmentBodyDetails()
                    {
                        AppointmentId = appointmentId,
                        BodySectionId = bodyDetail.BodySectionId,
                        ViewId = bodyDetail.ViewId,
                        MuscleId = bodyDetail.MuscleId,
                        JointId = bodyDetail.JointId,
                        BodySide = bodyDetail.BodySide
                    };

                    appointment.AppointmentBodyDetails.Add(appointmentBodyDetail);
                }

                // Remove body details that are not in the new list
                var bodyDetailsToRemove = currentBodyDetails
                    .Where(dbDetail => !bodyDetailsToSave.BodyDetails
                        .Any(newDetail => newDetail.BodySectionId == dbDetail.BodySectionId &&
                                          newDetail.BodySide == dbDetail.BodySide &&
                                          newDetail.MuscleId == dbDetail.MuscleId &&
                                          newDetail.JointId == dbDetail.JointId))
                    .ToList();

                _context.AppointmentBodyDetails.RemoveRange(bodyDetailsToRemove);

                await _context.SaveChangesAsync();
                return serviceResponse;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error saving body part details");
                return new ServiceResponse<bool>($"Error during saving body part details.");
            }
        }

        public async Task<ServiceResponse<List<LoadAppointmentBodyDetailsResponseDTO>>> LoadAppointmentBodyDetails(Guid appointmentId)
        {
            var serviceResponse = new ServiceResponse<List<LoadAppointmentBodyDetailsResponseDTO>>("Body part details loaded successfully");
            try
            {
                _logger.LogInformation("Loading body part details for appointmentId: {AppointmentId}", appointmentId);

                var selectedBodyPartsFromDb = await _context.AppointmentBodyDetails
                    .Where(abd => abd.AppointmentId == appointmentId)
                    .Include(abd => abd.BodySection)
                    .Include(abd => abd.View)
                    .Include(abd => abd.Muscle)
                    .Include(abd => abd.Joint)
                    .ToListAsync();

                var selectedMuscles = selectedBodyPartsFromDb
                    .Where(abd => abd.MuscleId != null)
                    .Select(abd => new MuscleResponseDTO(abd.Muscle))
                    .ToList();

                var selectedJoints = selectedBodyPartsFromDb
                    .Where(abd => abd.JointId != null)
                    .Select(abd => new JointResponseDTO(abd.Joint))
                    .ToList();

                var groupedBodyParts = selectedBodyPartsFromDb.GroupBy(abd => abd.BodySectionId);

                var selectedBodyParts = new List<LoadAppointmentBodyDetailsResponseDTO>();

                foreach (var bodyPart in groupedBodyParts)
                {
                    var firstBodyPart = bodyPart.First();
                    var viewSide = firstBodyPart.BodySide.Split("-");
                    var bodyPartDetailsRequest = new BodyPartDetailsRequestDTO
                    {
                        BodySectionName = firstBodyPart.BodySection.BodySectionName,
                        Gender = firstBodyPart.View.Gender,
                        ViewPosition = firstBodyPart.View.Name,
                        ViewSide = firstBodyPart.BodySection.BodySide,
                    };

                    var bodyPartFromDb = await _bodyVisualizerService.GetBodyPartDetails(bodyPartDetailsRequest);
                    var responseDto = new LoadAppointmentBodyDetailsResponseDTO
                    {
                        SelectedMuscles = bodyPartFromDb.Data.Muscles
                            .Where(muscle => selectedMuscles.Any(sm => sm.Id == muscle.Id))
                            .ToList(),
                        SelectedJoints = bodyPartFromDb.Data.Joints
                            .Where(joint => selectedJoints.Any(sj => sj.Id == joint.Id))
                            .ToList(),
                        BodyPartMusclesAndJoints = bodyPartFromDb.Data,
                    };

                    selectedBodyParts.Add(responseDto);
                }

                serviceResponse.Data = selectedBodyParts;
                _logger.LogInformation("Successfully loaded body part details for appointmentId: {AppointmentId}", appointmentId);
                return serviceResponse;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error loading body part details for appointmentId: {AppointmentId}", appointmentId);
                return new ServiceResponse<List<LoadAppointmentBodyDetailsResponseDTO>>($"Error during loading body part details.");
            }
        }
    }
}

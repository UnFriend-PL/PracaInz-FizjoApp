using fizjobackend.DbContexts;
using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Interfaces.AppointmentsInterfaces;
using fizjobackend.Interfaces.BodyVisualizerInterfaces;
using fizjobackend.Models.AppointmentsDTOs;
using Microsoft.EntityFrameworkCore;

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

                var appointmentsQuery = _context.Appointments
                    .Where(a => (a.PatientId == userId || a.PhysiotherapistId == userId) && a.AppointmentStatus == status);
                if (status == AppointmentStatus.Scheduled)
                {
                    DateTime startTime = DateTime.Now.AddHours(-1);
                    DateTime endTime = DateTime.Now.AddDays(8);
                    appointmentsQuery = appointmentsQuery.Where(a => a.AppointmentDate >= startTime && a.AppointmentDate <= endTime);
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

                foreach (var bodyDetail in bodyDetailsToSave.BodyDetails)
                {

                    var isAppointmentBodyDetailinDb = await _context.AppointmentBodyDetails
                        .AnyAsync(abd => abd.AppointmentId == appointmentId && 
                                         abd.BodySectionId == bodyDetail.BodySectionId && 
                                         abd.BodySide == bodyDetail.BodySide && 
                                         abd.MuscleId == bodyDetail.MuscleId &&
                                         abd.JointId == bodyDetail.JointId
                                         );
                    if(isAppointmentBodyDetailinDb) continue;
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

                await _context.SaveChangesAsync();
                return serviceResponse;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error saving body part details");
                return new ServiceResponse<bool>($"Error during saving body part details.");
            }
        }
    }
}

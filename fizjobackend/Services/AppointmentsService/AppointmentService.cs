using fizjobackend.DbContexts;
using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Interfaces.AppointmentsInterfaces;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.AppointmentsDTOs;
using fizjobackend.Models.UserDTOs;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend.Services.AppointmentsService
{
    public class AppointmentService : IAppointmentsService
    {
        private readonly FizjoDbContext _context;
        private readonly ILogger<AppointmentService> _logger;

        public AppointmentService(FizjoDbContext context, ILogger<AppointmentService> logger)
        {
            _context = context;
            _logger = logger;
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

                var patientResponseDto = new PatientInfoResponseDTO(patient);
                var physiotherapistResponseDto = new PhysiotherapistInfoResponseDTO(physiotherapist);
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

                var totalAppointmentsCount = await appointmentsQuery.CountAsync();
                var appointments = await appointmentsQuery
                    .OrderBy(a => a.AppointmentDate)
                    .Skip(page * 10)
                    .Take(10)
                    .Include(a => a.Patient)
                    .Include(a => a.Physiotherapist)
                    .ToListAsync();

                var preparedAppointments = appointments.Select(appointment =>
                    new AppointmentResponseDTO(
                        appointment,
                        new PatientInfoResponseDTO(appointment.Patient),
                        new PhysiotherapistInfoResponseDTO(appointment.Physiotherapist))
                    ).ToList();

                ListOfAppointmentsResponseDTO appointmentsResponse = new ListOfAppointmentsResponseDTO()
                {
                    Appointments = preparedAppointments,
                    CurrentPage = page,
                    TotalPages = (int)Math.Ceiling(totalAppointmentsCount / 10.0)
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
    }
}

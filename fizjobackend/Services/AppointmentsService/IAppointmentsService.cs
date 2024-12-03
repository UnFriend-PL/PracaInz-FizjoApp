using Fizjobackend.Entities.AppointmentEntities;
using Fizjobackend.Enums.AppointmentEnums;
using Fizjobackend.Models.AppointmentsDTOs;

namespace Fizjobackend.Services.AppointmentsService
{
    public interface IAppointmentsService
    {
        Task<ServiceResponse<AppointmentResponseDTO>> CreateAppointment(CreateAppointmentRequestDTO newAppointmentRequest);
        Task<ServiceResponse<ListOfAppointmentsResponseDTO>> GetAppointments(Guid userId, ListOfAppointmentsRequestDTO appointmentsRequest);
        Task<ServiceResponse<AppointmentResponseDTO>> GetAppointmentDetails(Guid userId, Guid appointmentId);
        Task<ServiceResponse<bool>> SaveBodyPartDetails(Guid userId, Guid appointmentId, SaveAppointmentBodyDetailsRequestDTO bodyDetailsToSave);
        Task<ServiceResponse<bool>> EditAppointment(Guid appointmentId, Guid physiotherapistId, EditAppointmentRequestDTO bodyDetailsToSave);
        Task<ServiceResponse<bool>> ChangeAppointmentStatus(Guid appointmentId, Guid physiotherapistId, ChangeAppointmentStatusRequestDTO status);
        Task<ServiceResponse<List<LoadAppointmentBodyDetailsResponseDTO>>> LoadAppointmentBodyDetails(Guid appointmentId);
    }
}

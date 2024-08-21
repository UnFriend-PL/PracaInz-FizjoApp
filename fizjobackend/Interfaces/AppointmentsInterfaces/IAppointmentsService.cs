using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Models.AppointmentsDTOs;

namespace fizjobackend.Interfaces.AppointmentsInterfaces
{
    public interface IAppointmentsService
    {
        Task<ServiceResponse<AppointmentResponseDTO>> CreateAppointment(CreateAppointmentRequestDTO newAppointmentRequest);
        Task<ServiceResponse<ListOfAppointmentsResponseDTO>> GetAppointments(Guid userId, AppointmentStatus status, int page);
        Task<ServiceResponse<AppointmentResponseDTO>> GetAppointmentDetails(Guid userId, Guid appointmentId);

    }
}

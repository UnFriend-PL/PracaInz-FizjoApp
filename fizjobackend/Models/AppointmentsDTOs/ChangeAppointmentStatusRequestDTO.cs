using fizjobackend.Enums.AppointmentEnums;
using System.Text.Json.Serialization;

namespace fizjobackend.Models.AppointmentsDTOs
{
    public class ChangeAppointmentStatusRequestDTO
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AppointmentStatus Status { get; set; }
    }
}

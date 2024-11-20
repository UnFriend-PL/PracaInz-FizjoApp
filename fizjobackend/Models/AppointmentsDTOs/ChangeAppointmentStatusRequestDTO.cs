using System.Text.Json.Serialization;
using Fizjobackend.Enums.AppointmentEnums;

namespace Fizjobackend.Models.AppointmentsDTOs
{
    public class ChangeAppointmentStatusRequestDTO
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AppointmentStatus Status { get; set; }
    }
}

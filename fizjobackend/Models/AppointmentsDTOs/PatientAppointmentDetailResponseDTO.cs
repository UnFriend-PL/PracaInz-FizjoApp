using fizjobackend.Entities.PatientEntities;

namespace fizjobackend.Models.AppointmentsDTOs
{
    public class PatientAppointmentDetailResponseDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string StreetWithHouseNumber { get; set; } = string.Empty;
        public string PostCode { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string HealthInsuranceNumber { get; set; } = string.Empty;

        public PatientAppointmentDetailResponseDTO() { }

        public PatientAppointmentDetailResponseDTO(Patient patient)
        {
            FirstName = patient.FirstName;
            LastName = patient.LastName;
            Gender = patient.Gender;
            Country = patient.Country;
            City = patient.City;
            StreetWithHouseNumber = patient.StreetWithHouseNumber;
            PostCode = patient.PostCode;
            DateOfBirth = patient.DateOfBirth;
            Email = patient.Email;
            PhoneNumber = patient.PhoneNumber;
            HealthInsuranceNumber = patient.HealthInsuranceNumber;
        }
    }
}

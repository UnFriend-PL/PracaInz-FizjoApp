using System.Text;
using Fizjobackend.Entities.PhysiotherapistEntities;
using Fizjobackend.Enums.AppointmentEnums;
using Fizjobackend.Enums.PhysiotherapistEnums;

namespace Fizjobackend.Models.StaffDTOs;

public class StaffResponseDTO
{
    public Guid PhysiotherapistId { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? City { get; set; }
    public string? PhoneNumber { get; set; }
    public string? AvatarPath { get; set; }
    public string? Description { get; set; }
    public double? Rating { get; set; }
    public int? YearsOfExperience { get; set; }
    public double? AveragePrice { get; set; }
    public int? NumberOfDoneAppointments { get; set; }
    public string? Education { get; set; }
    public ICollection<PhysiotherapySpecialization>? Specializations { get; set; }

    public StaffResponseDTO() { }

    public StaffResponseDTO(Physiotherapist staff)
    {
        PhysiotherapistId = staff.Id;
        Name = string.Concat(staff.FirstName, " ", staff.LastName);
        Email = staff.Email;
        PhoneNumber = staff.PhoneNumber;
        AvatarPath = staff.AvatarPath;
        Description = staff.Description;
        Rating = 5; // TODO: Implement rating calculation from opinions
        YearsOfExperience = staff.Experience;
        Education = staff.Education;

        if (staff.Appointments != null && staff.Appointments.Count > 0)
        {
            var totalPrice = staff.Appointments.Sum(a => a.Price);
            AveragePrice = totalPrice / staff.Appointments.Count;
        }
        else
        {
            AveragePrice = 0;
        }

        NumberOfDoneAppointments = staff.Appointments?.Count(a =>
            a.AppointmentStatus == AppointmentStatus.Completed ||
            a.AppointmentStatus == AppointmentStatus.Archived) ?? 0;

        Specializations = staff.PhysiotherapySpecializations?
            .Select(s => s.PhysiotherapySpecialization)
            .ToList();

        City = staff.City;
    }
}

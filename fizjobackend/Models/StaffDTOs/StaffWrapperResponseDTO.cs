namespace Fizjobackend.Models.StaffDTOs;

public class StaffWrapperResponseDTO
{
    public IEnumerable<StaffResponseDTO> Staff { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    
    public double? MaxPrice { get; set; }
    
    public StaffWrapperResponseDTO(IEnumerable<StaffResponseDTO> staff, int pageNumber, int pageSize, int totalCount, double? maxPrice)
    {
        Staff = staff;
        PageNumber = pageNumber;
        PageSize = pageSize;
        TotalCount = totalCount;
        MaxPrice = maxPrice;
    }
}
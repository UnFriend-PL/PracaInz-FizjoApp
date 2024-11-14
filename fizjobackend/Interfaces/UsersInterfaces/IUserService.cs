﻿using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
using fizjobackend.Models.UserDTOs;
using Microsoft.AspNetCore.Mvc;

namespace fizjobackend.Interfaces.UsersInterfaces
{
    public interface IUserService
    {
        Task<ServiceResponse<IUserInfoResponseDTO>> GetUserInfo(Guid userId, IEnumerable<string> userRoles);
        Task<ServiceResponse<IUserInfoResponseDTO>> FindPatient(SearchPatientRequestDTO searchParam, IEnumerable<string> userRoles);
        Task<ServiceResponse<IUserInfoResponseDTO>> UpdateInfo(Guid userId, UpdateUserInfoRequestDTO updateUserInfoRequest, IEnumerable<string> userRoles);
        Task<ServiceResponse<string>> UploadAvatar(Guid userId, IFormFile avatar);
        Task<ServiceResponse<FileStreamResult>> GetAvatarFile(string avatarPath);
    }
}

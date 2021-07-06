﻿using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;
using GTAVersions.Domain.Interfaces;

namespace GTAVersions.Domain.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(IUserService userService, IPasswordHasher passwordHasher)
        {
            _userService = userService;
            _passwordHasher = passwordHasher;
        }

        public async Task<AccessToken> Login(string firstName, string lastName, string username, string password)
        {
            var userDTO = await _userService.GetUserByUsername(username);

            if (userDTO == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var verified = _passwordHasher.Check(userDTO.PasswordHash, password);

            if (!verified)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var token = await _userService.UpdateUserToken(userDTO.Id, userDTO.Username);

            return token;
        }

        public async Task<AccessToken> Signup(string firstName, string lastName, string username, string password)
        {
            var passwordHash = _passwordHasher.PasswordHash(password);
            var createdUser = await _userService.CreateUser(firstName, lastName, username, passwordHash);

            if (createdUser == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var newUser = await _userService.GetUserById(createdUser.Id);
            var token = await _userService.UpdateUserToken(newUser.Id, newUser.Username);

            return token;
        }

        public async Task<UserDTO> ChangePassword(string newPassword, string oldPassword, int currentUserId)
        {
            var currentUser = await _userService.GetUserById(currentUserId);

            var verified = _passwordHasher.Check(currentUser.PasswordHash, oldPassword);

            if (!verified)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var passwordHash = _passwordHasher.PasswordHash(newPassword);
            var changedPassword = await _userService.ChangePassword(currentUserId, passwordHash);

            return changedPassword;
        }
    }
}

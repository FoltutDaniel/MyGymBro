﻿using backend.Entities;

namespace backend.Model
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }

        public string? Password { get; set; } = null;
    }
}
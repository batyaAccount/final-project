﻿namespace Api_Bussiness.API.PostEntity
{
    public class RegisterModel
    {

        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string RoleName { get; set; }
        public int? AccountantId { get; set; }

    }
}

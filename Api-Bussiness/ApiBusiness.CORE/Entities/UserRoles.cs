using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Entities
{
    public class UserRoles
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public Users User { get; set; }
        public int RoleId { get; set; }
        public Roles Role { get; set; }
    }
}

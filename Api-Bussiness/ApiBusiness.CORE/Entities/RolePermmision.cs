using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Entities
{
    public class RolePermmision
    {
        [Key]
        public int Id { get; set; }
        public int PermissionId { get; set; }
        public Pemmisions Permission { get; set; }

        public int RoleId { get; set; }
        public Roles Role { get; set; }
    }
}

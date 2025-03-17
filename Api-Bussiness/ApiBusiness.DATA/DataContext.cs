using ApiBusiness.CORE.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace ApiBusiness.DATA
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Receipts> Recipts { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<FinancialTransaction> FinancialTransaction { get; set; }
        public DbSet<CORE.Entities.File> files { get; set; }
      


    }
}

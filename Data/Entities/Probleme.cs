using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intervention.Data.Entities
{
    [Table("Problemes", Schema = "dbo")]
    public class Probleme
    {

        private DateTime _dateProbleme = DateTime.Now;
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [MinLength(3)]

        public string prenom { get; set; }

        [Required]
        [StringLength(50)]
        [MaxLength(50)]
        public string nom { get; set; }

        public string noProbleme { get; set; }

        public string courriel { get; set; }

        public string telephone { get; set; }

        public string notifications { get; set; }

        public string noUnite { get; set; }

        /*[Requiered]
        [StringLength(500)]
        [MinLength(5)]*/

        public string descriptionProbleme { get; set; }        
        

        public DateTime dateProbleme { 
            get{ return _dateProbleme; } 
            set{ _dateProbleme = value; }
        }
    }

}
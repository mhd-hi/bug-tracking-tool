using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intervention.Data.Entities
{
    [Table("TypeProbleme", Schema = "dbo")]
    public class TypeProbleme
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]

        public string descriptionProbleme { get; set; }
    }


}
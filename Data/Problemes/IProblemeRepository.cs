using System.Collections.Generic;
using Intervention.Data.Entities;

namespace Intervention.Data.Problemes
{
    public interface IProblemeRepository
    {
        IEnumerable<TypeProbleme> ObtenirTypesProbleme();
        void AddEntity(object model);
        bool Save();
    }
}
using System.Collections.Generic;
using Intervention.Data.Entities;

namespace Interventions.Data.Problemes
{
    public interface IProblemeRepository
    {
        IEnumerable<TypeProbleme> ObtenirTypesProblemes();
        void AddEntity(Probleme model);
        bool Save();
    }
}
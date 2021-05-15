using System;
using System.Collections.Generic;
using System.Linq;
using Intervention.Data.Entities;
using Microsoft.Extensions.Logging;

namespace Intervention.Data.Problemes
{
    public class ProblemeRepository : IProblemeRepository
    {
        private readonly InterventionsContext _ctx;
        private readonly ILogger<ProblemeRepository> _logger;

        public ProblemeRepository(InterventionsContext ctx, ILogger<ProblemeRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public IEnumerable<TypeProbleme> ObtenirTypesProbleme()
        {
            try
            {
                return _ctx.TypesProbleme.OrderBy(o => o.descriptionProbleme).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur dans l'obtention des donnees {ex}");
                return null;
            }
        }

        public void AddEntity(object model)
        {
            _ctx.Add(model);
        }

        public bool Save()
        {
            try
            {
                return _ctx.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur dans la sauvegarde {ex}");
                return false;
            }
        }
    }
}
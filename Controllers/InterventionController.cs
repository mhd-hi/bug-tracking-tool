using System;
using Intervention.Data.Entities;
using Intervention.Data.Problemes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Intervention.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InterventionController : ControllerBase
    {
        private readonly ILogger<InterventionController> _logger;
        private readonly IProblemeRepository _problemeRepository;

        public InterventionController(ILogger<InterventionController> logger, IProblemeRepository problemeRepository)
        {
            _logger = logger;
            
            _problemeRepository = problemeRepository;
        }

        [HttpGet]

        public IActionResult Get()
        {
            try
            {
                return Ok(_problemeRepository.ObtenirTypesProbleme());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur pour obtenir les types de produit {ex}");
                return BadRequest("Erreur pour obtenir les types de produit");
            }
        }
        [HttpPost]
        public IActionResult Post([FromBody] Probleme model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _problemeRepository.AddEntity(model);
                    if (_problemeRepository.Save())
                    {
                        return Created($"/intervention/{model.Id}", model);
                    }
                }
                else 
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur pour sauvegarder une déclaration de problème : {ex}");
            }
            return BadRequest("Erreur pour sauvegarder une déclaration de problème");
        }
    }
}
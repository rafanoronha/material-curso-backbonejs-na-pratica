using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Treinamentos.Models;
using Treinamentos.Util;

namespace Treinamentos.Controllers
{
    public class HomeController : Controller
    {
        private TreinamentosContext db = new TreinamentosContext();

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        //[Authorize(Roles = "turmas")]
        public ActionResult Turmas()
        {
            return View("Index");
        }

        [Authorize(Roles = "instrutores")]
        public ActionResult Instrutores()
        {
            return View("Index");
        }


        public PartialJsonNetResult TurmasBootstrap()
        {
            var turmas = db.Turmas
                .Include(t => t.Treinamento)
                .Include(t => t.Instrutor)
                .AsEnumerable().Select(x =>
                {
                    x.Inicio = x.Inicio.ToUniversalTime();
                    x.Fim = x.Fim.ToUniversalTime();
                    return x;
                });
            return new PartialJsonNetResult { Data = turmas };
        }

        public PartialJsonNetResult InstrutoresBootstrap()
        {
            var instrutores = db.Instrutors.AsEnumerable();
            return new PartialJsonNetResult { Data = instrutores };
        }

        public PartialJsonNetResult TreinamentosBootstrap()
        {
            var treinamentos = db.Treinamentoes.AsEnumerable();
            return new PartialJsonNetResult { Data = treinamentos };
        }
    }
}

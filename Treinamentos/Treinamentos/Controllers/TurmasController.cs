using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Treinamentos.Models;

namespace Treinamentos.Controllers
{
    public class TurmasController : ApiController
    {
        private TreinamentosContext db = new TreinamentosContext();

        // GET api/Turmas
        public IEnumerable<Turma> GetTurmas()
        {
            return db.Turmas
                .Include(t => t.Treinamento)
                .Include(t => t.Instrutor)
                .AsEnumerable().Select(x =>
                {
                    x.Inicio = x.Inicio.ToUniversalTime();
                    x.Fim = x.Fim.ToUniversalTime();
                    return x;
                });

        }

        // GET api/Turmas/5
        public Turma GetTurma(long id)
        {
            Turma turma = db.Turmas.Find(id);
            if (turma == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return turma;
        }

        // PUT api/Turmas/5
        public HttpResponseMessage PutTurma(long id, Turma turma)
        {
            if ("Fulano".Equals(turma.Instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Fulano");
            }
            if ("Ciclano".Equals(turma.Instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Ciclano");
            }

            if (ModelState.IsValid)
            {
                var entidade = db.Turmas.Find(id);
                entidade.Inicio = turma.Inicio;
                entidade.Fim = turma.Fim;
                if (turma.Treinamento.Id.HasValue)
                {
                    entidade.Treinamento = db.Treinamentoes.Find(turma.Treinamento.Id);
                }
                else
                {
                    entidade.Treinamento = new Treinamento { Nome = turma.Treinamento.Nome };
                }

                if (turma.Instrutor.Id.HasValue)
                {
                    entidade.Instrutor = db.Instrutors.Find(turma.Instrutor.Id);
                }
                else
                {
                    entidade.Instrutor = new Instrutor { Nome = turma.Instrutor.Nome };
                }


                //turma.Id = id;
                //db.Turmas.Attach(turma);
                //db.Entry(turma).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, entidade);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Turmas
        public HttpResponseMessage PostTurma(Turma turma)
        {
            if ("Fulano".Equals(turma.Instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Fulano");
            }
            if ("Ciclano".Equals(turma.Instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Ciclano");
            }

            if (ModelState.IsValid)
            {
                if (turma.Treinamento.Id.HasValue)
                {
                    turma.Treinamento = db.Treinamentoes.Find(turma.Treinamento.Id);
                }
                if (turma.Instrutor.Id.HasValue)
                {
                    turma.Instrutor = db.Instrutors.Find(turma.Instrutor.Id);
                }
                turma = db.Turmas.Add(turma);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, db.Turmas.Find(turma.Id));
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = turma.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Turmas/5
        public HttpResponseMessage DeleteTurma(long id)
        {
            Turma turma = db.Turmas.Find(id);
            if (turma == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Turmas.Remove(turma);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, turma);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
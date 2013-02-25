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
    public class InstrutoresController : ApiController
    {
        private TreinamentosContext db = new TreinamentosContext();

        // GET api/Instrutores
        public IEnumerable<Instrutor> GetInstrutors()
        {
            return db.Instrutors.AsEnumerable();
        }

        // GET api/Instrutores/5
        public Instrutor GetInstrutor(long id)
        {
            Instrutor instrutor = db.Instrutors.Find(id);
            if (instrutor == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return instrutor;
        }

        // PUT api/Instrutores/5
        public HttpResponseMessage PutInstrutor(long id, Instrutor instrutor)
        {
            if (string.IsNullOrEmpty(instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor é obrigatório");
            }
            if ("Fulano".Equals(instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Fulano");
            }
            if ("Ciclano".Equals(instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Ciclano");
            }

            if (ModelState.IsValid && id == instrutor.Id)
            {
                db.Entry(instrutor).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, instrutor);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Instrutores
        public HttpResponseMessage PostInstrutor(Instrutor instrutor)
        {
            if (string.IsNullOrEmpty(instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor é obrigatório");
            }
            if ("Fulano".Equals(instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Fulano");
            }
            if ("Ciclano".Equals(instrutor.Nome))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nome do instrutor não pode ser Ciclano");
            }

            if (ModelState.IsValid)
            {
                db.Instrutors.Add(instrutor);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, instrutor);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = instrutor.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Instrutores/5
        public HttpResponseMessage DeleteInstrutor(long id)
        {
            Instrutor instrutor = db.Instrutors.Find(id);
            if (instrutor == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Instrutors.Remove(instrutor);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, instrutor);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
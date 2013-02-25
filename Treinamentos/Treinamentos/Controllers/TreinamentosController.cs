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
    public class TreinamentosController : ApiController
    {
        private TreinamentosContext db = new TreinamentosContext();

        // GET api/Treinamentos
        public IEnumerable<Treinamento> GetTreinamentoes()
        {
            return db.Treinamentoes.AsEnumerable();
        }

        // GET api/Treinamentos/5
        public Treinamento GetTreinamento(long id)
        {
            Treinamento treinamento = db.Treinamentoes.Find(id);
            if (treinamento == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return treinamento;
        }

        // PUT api/Treinamentos/5
        public HttpResponseMessage PutTreinamento(long id, Treinamento treinamento)
        {
            if (ModelState.IsValid && id == treinamento.Id)
            {
                db.Entry(treinamento).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, treinamento);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Treinamentos
        public HttpResponseMessage PostTreinamento(Treinamento treinamento)
        {
            if (ModelState.IsValid)
            {
                db.Treinamentoes.Add(treinamento);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, treinamento);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = treinamento.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Treinamentos/5
        public HttpResponseMessage DeleteTreinamento(long id)
        {
            Treinamento treinamento = db.Treinamentoes.Find(id);
            if (treinamento == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Treinamentoes.Remove(treinamento);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, treinamento);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
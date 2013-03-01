using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Treinamentos.Controllers
{
    public class ErrorsController : ApiController
    {
        public HttpResponseMessage PostError(Error error)
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }

    public class Error
    {
        public string Msg { get; set; }
        public string Url { get; set; }
        public int LineNumber { get; set; }
    }
}

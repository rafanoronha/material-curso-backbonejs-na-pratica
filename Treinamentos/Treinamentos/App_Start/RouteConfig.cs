using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Treinamentos
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Turmas",
                url: "turmas/{id}",
                defaults: new { controller = "Home", action = "Turmas" }
            );
            routes.MapRoute(
                name: "Instrutores",
                url: "instrutores/{id}",
                defaults: new { controller = "Home", action = "Instrutores", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Turmas", id = UrlParameter.Optional }
            );
        }
    }
}
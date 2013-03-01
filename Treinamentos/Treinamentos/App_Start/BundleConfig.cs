using System.Web;
using System.Web.Optimization;

namespace Treinamentos
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/app")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/underscore.js")
                .Include("~/Scripts/backbone.js")
                .Include("~/Scripts/backbone-validation.js")
                .Include("~/Scripts/bootstrap.js")
                .Include("~/Scripts/app.js"));

            bundles.Add(new StyleBundle("~/Content/css")
                .Include("~/Content/bootstrap.css")
                .Include("~/Content/site.css"));
        }
    }
}
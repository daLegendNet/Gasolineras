using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Gasolinera.Web.Startup))]
namespace Gasolinera.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Gasolinera.Web.Helpers
{
    public static class HtmlHelperExtensions
    {
        public static string IsSelected(this HtmlHelper html, string controllers = "", string actions = "", string cssClass = "active")
        {
            ViewContext viewContext = html.ViewContext;
            bool isChildAction = viewContext.Controller.ControllerContext.IsChildAction;

            if (isChildAction)
                viewContext = html.ViewContext.ParentActionViewContext;

            RouteValueDictionary routeValues = viewContext.RouteData.Values;
            string currentAction = routeValues["action"].ToString();
            string currentController = routeValues["controller"].ToString();

            //if (String.IsNullOrEmpty(actions))
            //actions = currentAction;

            //if (String.IsNullOrEmpty(controllers))
            //controllers = currentController;

            List<String> acceptedActions = new List<string>();
            List<String> acceptedControllers = new List<string>();
            if (!String.IsNullOrEmpty(actions))
            {

                acceptedActions = actions.Trim().Split(',').Distinct().ToList();
            }
            if (!String.IsNullOrEmpty(controllers))
            {
                acceptedControllers = controllers.Trim().Split(',').Distinct().ToList();
            }

            return acceptedActions.Contains(currentAction) && acceptedControllers.Contains(currentController) ?
                cssClass : String.Empty;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AjaxPractice.Models;

namespace AjaxPractice.Controllers
{
    public class HomeController : Controller
    {
        private readonly AnarDbEntities db = new AnarDbEntities();
        public ActionResult Index()
        {
            List<Todo> todos = db.Todoes.Take(12).ToList();
            return View(todos);
        }

       public JsonResult List(int offset)
        {
            List<Todo> todos = db.Todoes.OrderBy(t => t.Id).Skip(offset).Take(300).ToList();
            return Json(todos.Select(t => new {
                t.Id,
                t.Title,
               Tamamlanib = t.Completed
            }), JsonRequestBehavior.AllowGet);
        }
    }
}
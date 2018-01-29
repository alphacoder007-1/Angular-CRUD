using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ngCrud;

namespace ngCrud.Controllers
{
    public class ContactsController : Controller
    {
        private Model1 db = new Model1();

        // GET: Contacts
        public ActionResult Index()
        {
            return View();
        }
    }
}

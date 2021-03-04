package fr.`override`.nsi.site

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView

@Controller("/display")
class RedirectsController {

    /*
    * Will display the html page (at: /pages/page2.html) when the user goes into root/redirect-messaging
    * */
    @RequestMapping(Array("/display"))
    def pageDisplay(): ModelAndView = {
        println("Mais gros respecte toi nan ?")
        new ModelAndView("/pages/display/page0.html")
    }


    /*
    * Will display the html page (at: /pages/page2.html) when the user goes into root/redirect-messaging
    * */
    @RequestMapping(Array("/redirector"))
    def pageRedirector(): ModelAndView = {
        new ModelAndView("/pages/redirector.html")
    }

}

package fr.`override`.nsi.site

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView
import org.springframework.messaging.handler.annotation.{MessageMapping, SendTo}

@Controller("/redirect-messaging")
class RedirectsController {


    @MessageMapping(Array("/redirect-messaging")) //Listen messages that comes from this page
    @SendTo(Array("/pages/display")) //Broadcasts the data returned by this method to all clients connected to this page
    def redirect(newPage: String): String = {
        newPage
    }

    /*
    * Will display the html page (at: /pages/test_page.html) when the user goes into root/redirect-messaging
    * */
    @RequestMapping(Array("/redirect-messaging"))
    def welcome(): ModelAndView = {
        new ModelAndView("/pages/test_page.html")
    }

}

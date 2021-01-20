package fr.`override`.nsi.site

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.{EnableWebSocketMessageBroker, StompEndpointRegistry, WebSocketMessageBrokerConfigurer}

@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig extends WebSocketMessageBrokerConfigurer  {

    override def configureMessageBroker(registry: MessageBrokerRegistry): Unit = {
        registry.enableSimpleBroker("/redirect-messaging")
        registry.setApplicationDestinationPrefixes()
    }

    override def registerStompEndpoints(registry: StompEndpointRegistry): Unit = {
        registry.addEndpoint("/redirect-messaging") //Not mandatory
        registry.addEndpoint("/redirect-messaging").withSockJS()
    }

}

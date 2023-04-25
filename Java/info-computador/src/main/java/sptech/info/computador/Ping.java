/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.info.computador;
import java.io.IOException;
import java.net.InetAddress;
/**
 *
 * @author Nathan David
 */
public class Ping {
    
    Long valorPing() {
        String host = "www.google.com"; // Especifique o host que você deseja pingar
        Long ping = null;
        try {
            InetAddress inetAddress = InetAddress.getByName(host);
            long startTime = System.currentTimeMillis();
            if (inetAddress.isReachable(5000)) { // Timeout de 5 segundos
                long endTime = System.currentTimeMillis();
                long pingTime = endTime - startTime;
                ping = pingTime;
            } else {
                System.out.println("Ping para " + host + " falhou.");
            }
        } catch (IOException e) {
            System.out.println("Ocorreu um erro durante o ping: " + e.getMessage());
        }
        
        return ping;
    }
}

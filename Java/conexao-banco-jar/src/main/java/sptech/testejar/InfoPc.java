/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.testejar;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Volume;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

/**
 *
 * @author Nathan David
 */
public class InfoPc {
    
    private Looca looca;

    public InfoPc() {
        this.looca = new Looca();
    }
    
    String numeroSerial() throws IOException {
        ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "wmic bios get serialnumber");
        builder.redirectErrorStream(true);
        Process process = builder.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        
        while ((line = reader.readLine()) != null) {
            if (!line.startsWith("SerialNumber") && line.length() > 0) {
                return line.trim();
            }
        }
        
        return null;        
    }
 
    String sistemaOperacional() {
        return looca.getSistema().getSistemaOperacional();
    }
    
    String nomeCPU() {
        return looca.getProcessador().getNome();
    }
    
    
    Integer nucleoFisico() {
        return looca.getProcessador().getNumeroCpusFisicas();
    }
    
    Integer nucleoLogico() {
        return looca.getProcessador().getNumeroCpusLogicas();
    }
    
    Long qtdRam() {
        Long qtdRamBytes = looca.getMemoria().getTotal();
        return qtdRamBytes / (1024 * 1024 * 1024);
    }
    
    Long qtdArmazenamento() {
        Long qtdArmazenamentoBytes = null;
       
        List<Volume> volumeDisco = looca.getGrupoDeDiscos().getVolumes();
        for (Volume discoVolume : volumeDisco) {
            qtdArmazenamentoBytes = discoVolume.getTotal();
        }
        
        return qtdArmazenamentoBytes / (1024 * 1024 * 1024);
    }
    
    String tipoDisco() throws IOException {
        ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "vol c:");
        builder.redirectErrorStream(true);
        Process process = builder.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = reader.readLine();

        if (line.contains("SSD") && line.length() > 0) {
            return "SSD";
        } else {
            return "HD";
        }
    }
}

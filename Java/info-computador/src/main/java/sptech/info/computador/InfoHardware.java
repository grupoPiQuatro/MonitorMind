/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.info.computador;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.sistema.Sistema;
import java.util.List;

/**
 *
 * @author Nathan David
 */
public class InfoHardware {

    private final String nomeCPU;
    private final String fabricanteCPU;
    private final String arquiteturaCPU;
    private final Long frequenciaCPU;
    private final Integer nucleoFisico;
    private final Integer nucleoLogico;
    private final Memoria ram;
    private final List<Disco> disco;
    private final List<Volume> volumeDisco;
    private final Sistema sistema;

    public InfoHardware() {
        Looca looca = new Looca();

        this.nomeCPU = looca.getProcessador().getNome();
        this.fabricanteCPU = looca.getProcessador().getFabricante();
        this.arquiteturaCPU = looca.getProcessador().getMicroarquitetura();
        this.frequenciaCPU = looca.getProcessador().getFrequencia();
        this.nucleoFisico = looca.getProcessador().getNumeroCpusFisicas();
        this.nucleoLogico = looca.getProcessador().getNumeroCpusLogicas();
        this.ram = looca.getMemoria();
        this.disco = looca.getGrupoDeDiscos().getDiscos();
        this.volumeDisco = looca.getGrupoDeDiscos().getVolumes();
        this.sistema = looca.getSistema();
    }


    @Override
    public String toString() {
        
        return String.format("\n-- Informações de Hardware -- \n\n"
                + "-- CPU -- \n"
                + "Nome: %s \n"
                + "Fabricante: %s \n"
                + "Arquitetura: %s \n"
                + "Frequência: %d \n"
                + "Núcleos físicos: %d \n"
                + "Núcleos lógicos: %d \n\n"
                + "-- RAM -- \n%s \n"
                + "-- Disco -- \n%s \n"
                + "volumeDisco: \n%s \n\n"
                + "-- Informações do sistema --\n%s",
                nomeCPU,
                fabricanteCPU,
                arquiteturaCPU,
                frequenciaCPU,
                nucleoFisico,
                nucleoLogico,
                ram,
                disco,
                volumeDisco,
                sistema);
    }
}

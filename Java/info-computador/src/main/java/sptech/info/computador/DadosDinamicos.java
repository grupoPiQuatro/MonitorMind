/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.info.computador;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.dispositivos.DispositivoUsb;
import com.github.britooo.looca.api.group.janelas.Janela;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.rede.Rede;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.servicos.Servico;
import com.github.britooo.looca.api.util.Conversor;
import java.util.List;

/**
 
 * @author Nathan David
 */
public class DadosDinamicos {
    private Double usoCPU;
    private String tempoAtividade;
    private String usoRam;
    private String usoDisco;
    private String leituraDisco;
    private String escritaDisco;
    private String recebidoRede;
    private String enviadoRede;
    private Integer totalServicoAtivo;
    private Integer totalServicoInativo;
    private List<Servico> listaServico;
    private Integer threadsTotal;
    private Integer processoExecTotal;
    private List<Processo> listaProcessoExec;
    private List<Janela> listaJanelas;
    private List<DispositivoUsb> listaUsbConectado;   

    public DadosDinamicos () {
        Looca looca = new Looca();
        Long escritaDisco = null;
        Long leituraDisco = null;;
        Long totalDisco = null;
        Long disponivelDisco = null;
        Long usoDisco = null;
        Long recebidoRede = null;
        Long enviadoRede = null;
        
//        DISCO
        List<Disco> discosGrupo = looca.getGrupoDeDiscos().getDiscos();
        for (Disco disco : discosGrupo) {
            escritaDisco = disco.getBytesDeEscritas();
            leituraDisco = disco.getBytesDeLeitura();
        }
        
        List<Volume> volumeGrupo = looca.getGrupoDeDiscos().getVolumes();
        for (Volume discoVolume : volumeGrupo) {
            totalDisco = discoVolume.getTotal();
            disponivelDisco = discoVolume.getDisponivel();
        }        
        usoDisco = totalDisco - disponivelDisco;
        
//        REDE

        
        List<RedeInterface> redeInterface = looca.getRede().getGrupoDeInterfaces().getInterfaces();
        for (RedeInterface interfaceRede : redeInterface) {
            recebidoRede = interfaceRede.getBytesRecebidos();
            enviadoRede = interfaceRede.getBytesEnviados();
        }
        

        this.usoCPU = looca.getProcessador().getUso();
        this.tempoAtividade = Conversor.formatarSegundosDecorridos(looca.getSistema().getTempoDeAtividade());
        this.usoRam = Conversor.formatarBytes(looca.getMemoria().getEmUso());
        this.usoDisco = Conversor.formatarBytes(usoDisco);
        this.leituraDisco = Conversor.formatarBytes(leituraDisco);
        this.escritaDisco = Conversor.formatarBytes(escritaDisco);
        this.recebidoRede = Conversor.formatarBytes(recebidoRede);
        this.enviadoRede = Conversor.formatarBytes(enviadoRede);
        this.totalServicoAtivo = looca.getGrupoDeServicos().getTotalServicosAtivos();
        this.totalServicoInativo = looca.getGrupoDeServicos().getTotalServicosInativos();
        this.listaServico = looca.getGrupoDeServicos().getServicos();
        this.threadsTotal = looca.getGrupoDeProcessos().getTotalThreads();
        this.processoExecTotal = looca.getGrupoDeProcessos().getTotalProcessos();
        this.listaProcessoExec = looca.getGrupoDeProcessos().getProcessos();
        this.listaJanelas = looca.getGrupoDeJanelas().getJanelas();
        this.listaUsbConectado = looca.getDispositivosUsbGrupo().getDispositivosUsbConectados();
    }

    @Override
    public String toString() {
        return String.format("\n-- Dados Dinâmicos -- \n\n"
                + "-- CPU -- \n"
                + "Uso: %.2f \n"
                + "Tempo atividade: %s \n\n"
                + "-- RAM -- : \n"
                + "Uso: %s \n\n"
                + "-- Disco -- \n"
                + "Uso: %s \n"
                + "Leitura: %s \n"
                + "Escrita: %s \n\n"
                + "-- REDE -- \n"
                + "Bytes enviado: %s \n"
                + "Byte recebido: %s \n\n"
                + "-- SERVIÇOS -- \n"
                + "Servicos Ativos: %d \n"
                + "Servicos Inativos: %d \n"
                + "Lista Servicos: %s \n\n"
                + "-- Processos -- \n"
                + "Threads: %d \n"
                + "Processos: %d \n"
                + "Lista processos: %s \n\n"
                + "-- JANELAS -- \n"
                + "Lista janelas: %s \n\n"
                + "-- USB -- \n"
                + "Lista USB conectado: %s",
                usoCPU,
                tempoAtividade,
                usoRam,
                usoDisco,
                leituraDisco,
                escritaDisco,
                enviadoRede,
                recebidoRede,
                totalServicoAtivo,
                totalServicoInativo,
                listaServico,
                threadsTotal,
                processoExecTotal,
                listaProcessoExec,
                listaJanelas,
                listaUsbConectado);
    }
    
    
    
}


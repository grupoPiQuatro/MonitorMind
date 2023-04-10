/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.testejar;

import java.io.IOException;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author Nathan David
 */
public class TesteConexao {

    public static void main(String[] args) throws IOException {
        Conexao conexao = new Conexao();
        InfoPc infoPc = new InfoPc();
        
        String numeroSerial = null;
        
        // DESCOMENTE ESSE CÓDIGO PARA TESTAR O CÓDIGO MAIS DE UMA VEZ NA MESMA MÁQUINA, POIS ELE GERA IDS DIFERENTES
        // SE AS DUAS LINHAS ABAIXO ESTIVEREM COMENTADAS A LINHA 28 DEVE ESTAR DESCOMENTADA
        Integer numeroAleatorio = ThreadLocalRandom.current().nextInt(1, 10001);
        numeroSerial = String.valueOf(numeroAleatorio);
        
//        numeroSerial = infoPc.numeroSerial();
        
        String so = infoPc.sistemaOperacional();
        String nomeCpu = infoPc.nomeCPU();
        Integer nucleoFisico = infoPc.nucleoFisico();
        Integer nucleoLogico = infoPc.nucleoLogico();
        Long qtdRam = infoPc.qtdRam();
        Long qtdArmazenamento = infoPc.qtdArmazenamento();
        String tipoDisco = infoPc.tipoDisco();
        String status = "Operando";
        Integer fkEmpresa = 1;

        JdbcTemplate con = conexao.getConnection();

        int linhasInseridas = con.update("insert into computador values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                numeroSerial,
                so,
                nomeCpu,
                nucleoFisico,
                nucleoLogico,
                qtdRam,
                qtdArmazenamento,
                tipoDisco,
                status,
                fkEmpresa
        );

       if (linhasInseridas > 0) {
           System.out.println("Query concluída com sucesso");
       } else {
           System.out.println("Falha na query do banco");
       }

    }
}

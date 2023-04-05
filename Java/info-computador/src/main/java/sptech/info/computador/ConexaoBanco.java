/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sptech.info.computador;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Volume;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author Nathan David
 */
public class ConexaoBanco {

    public static void main(String[] args) throws SQLException {
        Looca looca = new Looca();
        String so = looca.getSistema().getSistemaOperacional();
        String nomeCpu = looca.getProcessador().getNome();
        Long qtdRam = looca.getMemoria().getTotal();
        Long qtdArmazenamento = null;

        List<Volume> volumeDisco = looca.getGrupoDeDiscos().getVolumes();
        for (Volume discoVolume : volumeDisco) {
            qtdArmazenamento = discoVolume.getTotal();
        }

        Connection conexao = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conexao = DriverManager.getConnection("jdbc:mysql://localhost/MonitorMind", "MonitorMind", "monitormind");
            String sql = String.format("INSERT INTO Computador "
                    + "(sistemaOperacional, nomeCpu, qtdRam, qtdArmazenamento, fkEmpresa) "
                    + "VALUES ('%s', '%s', %d, %d, 1)",
                    so,
                    nomeCpu,
                    qtdRam,
                    qtdArmazenamento);

            PreparedStatement statement = conexao.prepareStatement(sql);
            int tupla = statement.executeUpdate(sql);

            if (tupla > 0) {
                System.out.println("Inserção bem sucedida!");
            }
            
            statement.close();
            
        } catch (ClassNotFoundException ex) {
            System.out.println("Driver do banco de dados não localizado");
        } catch (SQLException ex) {
            System.out.println("Ocorreu um erro ao acessar o banco: " + ex.getMessage());
        } finally {
            if (conexao != null) {
                conexao.close();
            }
        }
    }
}

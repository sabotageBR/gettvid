
package com.gettvid.util;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.SimpleTimeZone;
import java.util.TimeZone;

/**
 * Classe utilit�ria para trabalhar com data.
 * @author Evandro Moura
 */
public class UtilData implements Serializable{


	/**
	 * 
	 */
	private static final long serialVersionUID = -1787714815962920266L;

	private UtilString utilString = new UtilString();

	/** <code>DAY_DIFF</code> - Used for day diff */
	public static final int DAY_DIFF = 0;
	/** <code>MONTH_DIFF</code> - Used for month diff */
	public static final int MONTH_DIFF = 1;
	/** <code>YEAR_DIFF</code> - Used for year diff */
	public static final int YEAR_DIFF = 2;
	/** <code>YEAR_DIFF</code> - Used for milliseconds diff */
	public static final int MILLI_DIFF = 3;
	/** <code>YEAR_DIFF</code> - Used for seconds diff */
	public static final int SEC_DIFF = 4;
	
	/** <code>YEAR_DIFF</code> - Used for seconds diff */
	public static final int MIN_DIFF = 5;

	/*
	 * Pattern padr�o para o Brasil
	 */
	private static final String DEFAULT_PATTERN = "dd/MM/yyyy";
	public static final String DEFAULT_PATTERN_DATA_HORA = "dd/MM/yyyy hh:mm:ss";

	/*
	 * Evita a cria��o de uma inst�ncia de objeto DateTimeHelper
	 */

	/*
	 * Constantes para as fun��es de incremento e decremento de datas
	 */
	public static final int SEGUNDOS = 0;

	public static final int MINUTOS = 1;

	public static final int HORAS = 2;

	public static final int DIAS = 3;

	public static final int MESES = 4;

	public static final int ANOS = 5;

	public static final int INCREMENTO = 0;

	public static final int DECREMENTO = 1;

	/** Offset of our time zone. */
	private static final int TIMEZONE_OFFSET = 3600000;
	/** ID of our timezone. */
	private static final String TIMEZONE_ID = "America/Sao_Paulo";

	// create a timezone with no daylight savings
	private static final SimpleTimeZone TIMEZONE;

	static {
		TIMEZONE = new SimpleTimeZone(UtilData.TIMEZONE_OFFSET,
				UtilData.TIMEZONE_ID);
	}

	/**
	 * messagesReport_pt_BR.properties
	 * 
	 * @param pintType int
	 * @param pdatValue1 Date
	 * @param pdatValue2 Date
	 * @return long
	 */
	public  long datediff(int pintType, Date pdatValue1, Date pdatValue2) {
		return datediff(pintType, pdatValue1, pdatValue2, false);
	}

	/**
	 * M�todo que compara data
	 * 
	 * @param pintType int
	 * @param pdatValue1 Date
	 * @param pdatValue2 Date
	 * @param inclusiveDatas boolean
	 * @return Long
	 */
	public  long datediff(int pintType, Date pdatValue1, Date pdatValue2,
			boolean inclusiveDatas) {
		long datediff = 0;
		int iDatas;

		if (inclusiveDatas) {
			iDatas = 1;
		} else {
			iDatas = 0;
		}

		Calendar calValue1 = null;
		Calendar calValue2 = null;
		if ((pintType != SEC_DIFF) && (pintType != MILLI_DIFF)) {
			calValue1 = Calendar.getInstance();
			calValue1.setTime(pdatValue1);
			calValue2 = Calendar.getInstance();
			calValue2.setTime(pdatValue2);
		} else {
			calValue1 = Calendar.getInstance();
			calValue2 = Calendar.getInstance();
		}

		switch (pintType) {

		case MILLI_DIFF:
			datediff = pdatValue1.getTime() - pdatValue2.getTime();
			break;

		case SEC_DIFF:
			datediff = (pdatValue1.getTime() - pdatValue2.getTime()) / 1000;
			break;
			
		case MIN_DIFF:
			datediff = ((pdatValue1.getTime() - pdatValue2.getTime()) / 1000)/60;
			break;	

		case DAY_DIFF:
			if (calValue1.get(Calendar.YEAR) - calValue2.get(Calendar.YEAR) > 0) {
				int years = calValue1.get(Calendar.YEAR)
						- calValue2.get(Calendar.YEAR);
				datediff = years * 365;
			}
			datediff = datediff + calValue1.get(Calendar.DAY_OF_YEAR)
					- calValue2.get(Calendar.DAY_OF_YEAR);
			break;

		case MONTH_DIFF:
			if (calValue1.get(Calendar.YEAR) - calValue2.get(Calendar.YEAR) > 0) {
				int years = calValue1.get(Calendar.YEAR)
						- calValue2.get(Calendar.YEAR);
				datediff = years * 12;
			}
			datediff = (datediff + calValue1.get(Calendar.MONTH) - calValue2
					.get(Calendar.MONTH))
					+ (iDatas);
			break;

		case YEAR_DIFF:
			datediff = calValue1.get(Calendar.YEAR)
			- calValue2.get(Calendar.YEAR);
			break;

		default:
			datediff = 0;
			break;
		}

		return datediff;
	}

	/**
	 * M�todo que adiciona meses
	 * 
	 * @param data Date
	 * @param quantidadeMeses int
	 * @return Date
	 */
	public  Date adicionarMeses(Date data, int quantidadeMeses) {

		Calendar cal = GregorianCalendar.getInstance();

		cal.setTime(data);

		cal.add(Calendar.MONTH, quantidadeMeses);

		return cal.getTime();
	}
	
	
	/**
	 * Metodo que ajusta data de acordo com timeZone.
	 * 
	 * @param data
	 * @param timeZone
	 * @return Date
	 */
	public Date calcularTimezone(Date data, TimeZone timeZone) {
		Date retorno = null;
		Calendar cal = GregorianCalendar.getInstance();
		cal.setTime(data);
		cal.setTimeZone(timeZone);
		retorno =  cal.getTime();
		return ajustaData(retorno, cal.get(Calendar.HOUR_OF_DAY), getMinutos(retorno), getSegundos(retorno));
	}
	
//	public static void main(String[] args) {
//		Date dataAtual = new Date();
//		System.out.println(dataAtual);
//		UtilData utilData = new UtilData();
//		System.out.println(utilData.calcularTimezone(dataAtual,TimeZone.getTimeZone("America/Manaus")));
//	}

	/**
	 * M�todo que adiciona Anos
	 * 
	 * @param data Date
	 * @param quantidadeAnos int
	 * @return Date
	 */

	public  Date adicionarAnos(Date data, int quantidadeAnos) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.YEAR, quantidadeAnos);
		return cal.getTime();
	}
	/**
	 * M�todo que adiciona Anos
	 * 
	 * @param data Date
	 * @param quantidadeAnos int
	 * @return Date
	 */

	public Date adicionarHoras(Date data, int quantidadeHoras) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.HOUR, quantidadeHoras);
		return cal.getTime();
	}
	
	public Date adicionarMinuto(Date data, int quantidadeMinutos) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.MINUTE, quantidadeMinutos);
		return cal.getTime();
	}

	/**
	 * M�todo que subtrai meses
	 * 
	 * @param data Date
	 * @param quantidadeMeses int
	 * @return Date
	 */
	
	public  Date subtrairMeses(Date data, int quantidadeMeses) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.MONTH, quantidadeMeses * -1);
		return cal.getTime();
	}
	/**
	 * M�todo que subtrai dias
	 * 
	 * @param data Date
	 * @param quantidadeDias int
	 * @return Date
	 */

	public  Date subtrairDias(Date data, int quantidadeDias) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.DAY_OF_MONTH, quantidadeDias * -1);
		return cal.getTime();
	}

	/**
	 * M�todo que subtrai meses
	 * 
	 * @param data Date
	 * @param quantidadeMeses int
	 * @return Date
	 */

	public Date subtrairHoras(Date data, int quantidadeHoras) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.HOUR_OF_DAY, quantidadeHoras * -1);
		return cal.getTime();
	}


	/**
	 * M�todo que subtrai meses
	 * 
	 * @param data Date
	 * @param quantidadeMeses int
	 * @return Date
	 */

	public Date subtrairMinutos(Date data, int quantidadeMinuto) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.MINUTE, quantidadeMinuto * -1);
		return cal.getTime();
	}
	
	public Date subtrairMilisegundos(Date data, int quantidadeMilisegundos) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(data);
		cal.add(Calendar.MILLISECOND, quantidadeMilisegundos * -1);
		return cal.getTime();
	}

	/**
	 * M�todo que formata data
	 * 
	 * @param date Date
	 * @return String
	 */
	public String formatDate(java.util.Date date) {
		String retorno = null;
		if (date != null) {
			SimpleDateFormat formatter = new SimpleDateFormat(DEFAULT_PATTERN,
					new Locale("pt", "BR"));
			// formatter.setTimeZone(TimeZone.getTimeZone("GMT-3"));
			retorno = formatter.format(date);
		} else {
			retorno = "";
		}
		return retorno;
	}

	/**
	 * M�todo que formata date
	 * 
	 * @param date Date
	 * @param pattern String
	 * @return String
	 */
	public String formatDate(java.util.Date date, String pattern) {
		String retorno;
		if (date == null) {
			retorno = "";
		} else {
			SimpleDateFormat formatter = new SimpleDateFormat(pattern,
					new Locale("pt", "BR"));
			//			formatter.setTimeZone(TimeZone.getTimeZone("GMT-3"));
			retorno = formatter.format(date);
		}
		return retorno;
	}

	private  String getDiaExtensoPorAbreviacao(String nomeDiaSemana) {
		String retorno = "";
		if (nomeDiaSemana.equalsIgnoreCase("dom")
				|| nomeDiaSemana.equalsIgnoreCase("sun")) {
			retorno = " Domingo ";
		} else if (nomeDiaSemana.equalsIgnoreCase("seg")
				|| nomeDiaSemana.equalsIgnoreCase("mon")) {
			retorno = " Segunda-feira ";
		} else if (nomeDiaSemana.equalsIgnoreCase("ter")
				|| nomeDiaSemana.equalsIgnoreCase("tue")) {
			retorno = " Ter�a-feira ";
		} else if (nomeDiaSemana.equalsIgnoreCase("qua")
				|| nomeDiaSemana.equalsIgnoreCase("wed")) {
			retorno = " Quarta-feira ";
		} else if (nomeDiaSemana.equalsIgnoreCase("qui")
				|| nomeDiaSemana.equalsIgnoreCase("thu")) {
			retorno = " Quinta-feira ";
		} else if (nomeDiaSemana.equalsIgnoreCase("sex")
				|| nomeDiaSemana.equalsIgnoreCase("fri")) {
			retorno = " Sexta-feira ";
		} else if (nomeDiaSemana.equalsIgnoreCase("sab")
				|| nomeDiaSemana.equalsIgnoreCase("sat")) {
			retorno = " S�bado ";
		}
		return retorno;
	}

	public String obterMesPorMesNumerico(String mes) {
		String retorno = "";
		if (mes.equals("01")) {
			retorno = "Janeiro";
		} else if (mes.equals("02")) {
			retorno = "Fevereiro";
		} else if (mes.equals("03")) {
			retorno = "Março";
		} else if (mes.equals("04")) {
			retorno = "Abril";
		} else if (mes.equals("05")) {
			retorno = "Maio";
		} else if (mes.equals("06")) {
			retorno = "Junho";
		} else if (mes.equals("07")) {
			retorno = "Julho";
		} else if (mes.equals("08")) {
			retorno = "Agosto";
		} else if (mes.equals("09")) {
			retorno = "Setembro";
		} else if (mes.equals("10")) {
			retorno = "Outubro";
		} else if (mes.equals("11")) {
			retorno = "Novembro";
		} else if (mes.equals("12")) {
			retorno = "Dezembro";
		}
		return retorno;
	}



	/**
	 * M�todo que exibe a data por extenso
	 * 
	 * @param data Date
	 * @param formato int
	 * @param icdia int
	 * @param isDiasExtenso boolean
	 * @param isAnoExtenso boolean
	 * @return String
	 */
	public  String dataExtenso(
			Date data, 
			int formato, int icdia,
			boolean isDiasExtenso, 
			boolean isAnoExtenso) {
		UtilData utilData = new UtilData();

		String dataDDMMAAA = utilData.formatDate(data);
		String dia = dataDDMMAAA.substring(0, 2);
		String mes = dataDDMMAAA.substring(3, 5);
		String ano = dataDDMMAAA.substring(6, dataDDMMAAA.length());
		StringBuffer retorno = new StringBuffer();
		String nomeDiaSemana = getDiaSemana(data);
		if (icdia == 0) {
			retorno.append(getDiaExtensoPorAbreviacao(nomeDiaSemana));
		}
		if (isDiasExtenso) {
			retorno.append(UtilValorExtenso.valorExtenso(new Double(dia)
			.doubleValue()));
			if (dia.equals("1")) {
				retorno.append(" dia ");
			} else {
				retorno.append(" dias ");
			}
		} else {
			retorno.append(dia);
		}
		if (formato == 0) {
			retorno.append(" de ");
		} else if (formato == 1) {
			retorno.append(" do m�s de ");
		}
		retorno.append(obterMesPorMesNumerico(mes));
		if (formato == 0) {
			retorno.append(" de ");
		} else if (formato == 1) {
			retorno.append(" do ano ");
		}
		if (isAnoExtenso) {
			retorno.append(UtilValorExtenso.valorExtenso(new Double(ano)
			.doubleValue()));
		} else {
			retorno.append(ano);
		}
		return retorno.toString();
	}

	/**
	 * Retorna a data em formato texto
	 * 
	 * @param data Date
	 * @return String
	 */
	@Deprecated
	public  String toString(Date data) {
		String dataFormatada = null;
		if (data != null) {
			SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada = f.format(data);
		}
		return dataFormatada;
	}

	/**
	 * Retorna a data em formato texto
	 * 
	 * @param data Date
	 * @return String
	 */
	@Deprecated
	public  String toStringDataHora(Date data) {
		String dataFormatada = null;
		if (data != null) {
			SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			dataFormatada = f.format(data);
		}
		return dataFormatada;
	}

	/**
	 * Method toStringDataHora.
	 * 
	 * @param data Date
	 * @param pattern String
	 * @return String
	 */
	@Deprecated
	public  String toStringDataHora(Date data, String pattern) {
		String dataFormatada = null;

		if (data != null) {
			SimpleDateFormat f = new SimpleDateFormat(pattern);
			dataFormatada = f.format(data);
		}

		return dataFormatada;
	}

	/**
	 * Retorna a data em formato texto
	 * 
	 * @param data Date
	 * @return Date
	 */
	public  Date toDataHoraString(String data) {
		Date dataFormatada = null;
		if (data != null) {
			try {
				SimpleDateFormat f = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
				dataFormatada = f.parse(data);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return dataFormatada;
	}

	/**
	 * Retorna a data em formato texto
	 * 
	 * @param data Date
	 * @return String
	 */
	public  String toStringHora(Date data) {
		String dataFormatada = null;
		if (data != null) {
			SimpleDateFormat f = new SimpleDateFormat("HH:mm");
			dataFormatada = f.format(data);
		}
		return dataFormatada;
	}

	/**
	 * M�todo que transforma String em Date
	 * 
	 * @param dataStr String
	 * @return String
	 */

	public  Date toDate(String dataStr) {

		SimpleDateFormat df = null;
		Date data = null;

		try {

			if ((dataStr != null) && !dataStr.equals("")) {
				df = new SimpleDateFormat("dd/MM/yyyy");
				data = df.parse(dataStr);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return data;
	}

	/**
	 * M�todo que converte uma String para Data e Hora
	 * 
	 * @param dataStr String
	 * @return Date
	 */
	public  Date toDateAndHour(String dataStr) {

		SimpleDateFormat df = null;
		Date data = null;

		try {

			if ((dataStr != null) && !dataStr.equals("")) {
				df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
				data = df.parse(dataStr);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return data;
	}

	/**
	 * Compara se a diferen�a entre a data passada e a data atual � igual a
	 * quantidade de dias passados
	 * 
	 * @param data Date
	 * @param dias int
	 * @return boolean
	 */

	public  boolean compara(Date data, int dias) {
		Calendar calData = null;
		Calendar calAtual = null;
		boolean retorno = false;
		try {
			if (data != null) {
				calData = Calendar.getInstance();
				calAtual = Calendar.getInstance();
				calData.setTime(data);
				calAtual.setTime(new Date());
				calAtual.add(Calendar.DATE, dias);
				if ((calData.get(Calendar.DATE) == calAtual.get(Calendar.DATE))
						&& (calData.get(Calendar.MONTH) == calAtual
						.get(Calendar.MONTH))
						&& (calData.get(Calendar.YEAR) == calAtual
						.get(Calendar.YEAR))) {
					retorno = true;
				} else {
					retorno = false;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

	/**
	 * Adiciona (ou subtrai) dias a uma Data
	 * 
	 * @param dataInicial Date
	 * @param dias int
	 * @return Date
	 */
	public  Date adicionaDias(Date dataInicial, int dias) {

		Calendar calendar = null;
		Date dataFinal = null;

		try {

			if (dataInicial != null) {
				calendar = Calendar.getInstance();
				calendar.setTime(dataInicial);

				calendar.add(Calendar.DATE, dias);
				dataFinal = calendar.getTime();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		dataInicial = null;
		calendar = null;

		return dataFinal;
	}

	/**
	 * Ajusta as horas, minutos e segundos de uma data
	 * 
	 * @param data Date
	 * @param horas int
	 * @param minutos int
	 * @param segundos int
	 * @return Date
	 */
	public  Date ajustaData(Date data, int horas, int minutos,
			int segundos) {
		Calendar calendar = null;
		try {
			if (data != null) {
				calendar = Calendar.getInstance();
				calendar.setTime(data);
				calendar.set(Calendar.HOUR_OF_DAY, horas);
				calendar.set(Calendar.MINUTE, minutos);
				calendar.set(Calendar.SECOND, segundos);
				data = calendar.getTime();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}
	
	
	public  Date ajustaData(Date data,int dia, int horas, int minutos,
			int segundos) {
		Calendar calendar = null;
		try {
			if (data != null) {
				calendar = Calendar.getInstance();
				calendar.setTime(data);
				calendar.set(Calendar.DAY_OF_MONTH, dia);
				calendar.set(Calendar.HOUR_OF_DAY, horas);
				calendar.set(Calendar.MINUTE, minutos);
				calendar.set(Calendar.SECOND, segundos);
				data = calendar.getTime();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}

	/**
	 * Retorna a diferen�a em minutos entre duas datas
	 * 
	 * @param dataMaior Date
	 * @param dataMenor Date
	 * @return long
	 */
	public static long getDiferencaMinutos(Date dataMaior, Date dataMenor) {
		long time1 = 0;
		long time2 = 0;
		long time3 = 0;
		try {
			time1 = dataMaior.getTime();
			time2 = dataMenor.getTime();
			time3 = time1 - time2;
			time3 = time3 / 1000 / 60; // convers�o para minutos
		} catch (Exception e) {
			e.printStackTrace();
		}
		return time3;
	}
	
	/**
	 * Retorna a diferen�a em minutos entre duas datas
	 * 
	 * @param dataMaior Date
	 * @param dataMenor Date
	 * @return long
	 */
	public double getDiferencaMinutosDouble(Date dataMaior, Date dataMenor) {
		double time1 = 0;
		double time2 = 0;
		double time3 = 0;
		try {
			time1 = dataMaior.getTime();
			time2 = dataMenor.getTime();
			time3 = time1 - time2;
			time3 = time3 / 1000 / 60; // convers�o para minutos
		} catch (Exception e) {
			e.printStackTrace();
		}
		return time3;
	
	}
	

	

	/**
	 * Retorna a diferen�a em dias entre duas datas
	 * 
	 * @param dataMaior Date
	 * @param dataMenor Date
	 * @return long
	 */
	public long getDiferencaDias(Date dataMaior, Date dataMenor) {
		long diferenca = 0;
		try {
			diferenca = getDiferencaMinutos(dataMaior, dataMenor);
			diferenca = diferenca / 1440; 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return diferenca;
	}
	
	
	/**
	 * Retorna a diferen�a em dias entre duas datas
	 * 
	 * @param dataMaior Date
	 * @param dataMenor Date
	 * @return long
	 */
	public long getDiferencaMes(Date dataMaior, Date dataMenor) {
		long diferenca = 0;
		try {
			diferenca = getDiferencaDias(dataMaior, dataMenor);
			diferenca = diferenca / 30; 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return diferenca;
	}

	/**
	 * Data Corrente
	 * 
	 * @return String
	 */
	public String getDateDDMMAAAA() {
		StringBuffer sb = new StringBuffer();

		Calendar calendar = Calendar.getInstance();

		if (calendar.get(Calendar.DATE) < 10) {
			sb.append("0" + calendar.get(Calendar.DATE) + "/");
		} else {
			sb.append("" + calendar.get(Calendar.DATE) + "/");
		}

		if ((calendar.get(Calendar.MONTH) + 1) < 10) {
			sb.append("0" + (calendar.get(Calendar.MONTH) + 1) + "/");
		} else {
			sb.append("" + (calendar.get(Calendar.MONTH) + 1) + "/");
		}

		sb.append("" + calendar.get(Calendar.YEAR));

		return sb.toString();
	}

	/**
	 * Dia Corrente
	 * 
	 * @return String
	 */
	public  String getDiaCorrente() {
		StringBuffer sb = new StringBuffer();

		Calendar calendar = Calendar.getInstance();
		if (calendar.get(Calendar.DATE) < 10) {
			sb.append("0" + calendar.get(Calendar.DATE));
		} else {
			sb.append("" + calendar.get(Calendar.DATE));
		}

		return sb.toString();
	}

	/**
	 * Retorna a data do sistema por extenso
	 * 
	 * @return String
	 */
	public  final String getDataSistemaPorExtenso() {
		SimpleDateFormat f = new SimpleDateFormat(
				"EEEEE, dd 'de' MMMM 'de' yyyy");
		return f.format(new Date(System.currentTimeMillis()));

	}

	/**
	 * Retorna a data do sistema por extenso
	 * 
	 * @return String
	 */
	public String getDataDicom(Date date) {
		UtilString utilString = new UtilString();
		StringBuilder sb = new StringBuilder();
		sb.append(this.getAno(date));
		sb.append(utilString.completaComZerosAEsquerda(new Long(this.getMes(date)).toString(), 2));
		sb.append(utilString.completaComZerosAEsquerda(new Long(this.getDia(date)).toString(), 2));
		return sb.toString();
	}

	/**
	 * Mes Corrente por extenso
	 * 
	 * @return String
	 */
	public  String getMesCorrente() {
		SimpleDateFormat f = new SimpleDateFormat("MM");
		return f.format(new Date());
	}

	/**
	 * Ano Corrente
	 * 
	 * @return String
	 */
	public  String getAnoCorrente() {
		return new Integer((Calendar.getInstance().get(Calendar.YEAR))).toString();
	}

	/**
	 * Data Corrente
	 * 
	 * @return String
	 */
	public String getDateHHMM() {
		StringBuffer sb = new StringBuffer();
		Calendar calendar = Calendar.getInstance();
		String temp;
		String temps;
		String minfor = null;
		String minfors = null;
		int hora = calendar.get(Calendar.HOUR_OF_DAY);
		int mim = calendar.get(Calendar.MINUTE);
		int sec = calendar.get(Calendar.SECOND);
		temp = mim + "";
		if (temp.length() == 1) {
			minfor = "0" + mim;
		} else {
			minfor = mim + "";
		}
		temps = sec + "";
		if (temps.length() == 1) {
			minfors = "0" + sec;
		} else {
			minfors = sec + "";
		}
		sb.append(String.valueOf(hora) + ":" + minfor + ":" + minfors);
		sb.append(" hs");
		return sb.toString();
	}

	/**
	 * Data Corrente no formato Original
	 * 
	 * @return String
	 */
	public String getDateUsa() {
		StringBuffer sb = new StringBuffer();

		Calendar calendar = Calendar.getInstance();

		sb.append(calendar.getTime());

		return sb.toString();
	}

	/**
	 * Retorna nome do dia.
	 * 
	 * @param data Date
	 * @return String
	 */
	public String getDiaSemana(Date data) {
		String dataFormatada = null;
		if (data != null) {
			SimpleDateFormat f = new SimpleDateFormat("EEE");
			dataFormatada = f.format(data);
		}
		return dataFormatada;
	}

	/**
	 * Data no formato boolBrasil true � dd/mm/yyyy Data no formato boolBrasil
	 * false � yyyy-mm-dd
	 * 
	 * @param data String
	 * @param boolBrasil boolean
	 * @return Timestamp
	 */
	public Timestamp getSqlTimestamp(String data, boolean boolBrasil) {
		Timestamp retorno;
		if (data.length() != 10) {
			retorno = null;
		} else {
			String strAno = null;
			String strMes = null;
			String strDia = null;
			if (boolBrasil) {
				strAno = data.substring(6, 10);
				strMes = data.substring(3, 5);
				strDia = data.substring(0, 2);
			} else {
				strAno = data.substring(0, 4);
				strMes = data.substring(5, 7);
				strDia = data.substring(8, 10);
			}
			retorno = Timestamp.valueOf(strAno + "-" + strMes + "-" + strDia
					+ " 00:00:00.000000000");
		}
		return retorno;
	}

	/**
	 * Data no formato boolBrasil true � dd/mm/yyyy hh:mm Data no formato
	 * boolBrasil false � yyyy-mm-dd
	 * 
	 * @param data String
	 * @param boolBrasil boolean
	 * @return Timestamp
	 */
	public Timestamp getTimestamp(String data, boolean boolBrasil) {
		Timestamp retorno;

		if (data.length() < 16) {
			retorno = null;
		} else {
			String strAno = null;
			String strMes = null;
			String strDia = null;
			String strHora = null;
			String strMin = null;
			if (boolBrasil) {
				strAno = data.substring(6, 10);
				strMes = data.substring(3, 5);
				strDia = data.substring(0, 2);
				strHora = data.substring(11, 13);
				strMin = data.substring(14, 16);
			} else {
				strAno = data.substring(0, 4);
				strMes = data.substring(5, 7);
				strDia = data.substring(8, 10);
				strHora = data.substring(11, 13);
				strMin = data.substring(14, 16);

			}
			retorno = Timestamp.valueOf(strAno + "-" + strMes + "-" + strDia
					+ " " + strHora + ":" + strMin + ":00.000000000");
		}
		return retorno;
	}

	/**
	 * Retorna o nome do dia da semana.
	 * @param data Date
	 * @return String
	 */
	public String retornarDiaSemana(Date data) {
		String retorno = "";
		if (data != null) {
			SimpleDateFormat f = new SimpleDateFormat("EEEE");
			retorno = f.format(data);
		}
		return retorno;
	}

	/**
	 * Retorna a data maior entre 2 testadas
	 * 
	 * @param data1 Date
	 * @param data2 Date
	 * @return Date
	 */

	public  Date getMaiorData(Date data1, Date data2) {

		Date retorno;
		if ((data1 == null) && (data2 != null)) {
			retorno = data2;
		} else if ((data1 != null) && (data2 == null)) {
			retorno = data1;
		} else if ((data1 == null) && (data2 == null)) {
			retorno = null;
		} else {
			if ((data1 != null) && (data1.after(data2))) {
				retorno = data1;
			} else {
				retorno = data2;
			}
		}
		return retorno;
	}

	/**
	 * Retorna a menor data de 2 testadas
	 * 
	 * @param data1 Date
	 * @param data2 Date
	 * @return long
	 */

	public Date getMenorData(Date data1, Date data2) {
		Date dataRetorno;

		if ((data1 == null) && (data2 != null)) {
			dataRetorno = data2;
		} else if ((data1 != null) && (data2 == null)) {
			dataRetorno = data1;
		} else if ((data1 == null) && (data2 == null)) {
			dataRetorno = null;
		} else {
			if ((data1 != null) && (data1.before(data2))) {
				dataRetorno = data1;
			} else {
				dataRetorno = data2;
			}
		}
		return dataRetorno;
	}

	/**
	 * Retorna se a data 1 � maior ou igual a data 2
	 * 
	 * @param dt1 Date
	 * @param d2 Date
	 * @return boolean
	 */
	public boolean data1MaiorIgualData2(Date dt1, Date d2) {
		return ((dt1.compareTo(d2) > 0) || (dt1.compareTo(d2) == 0));
	}

	/**
	 * Retorna se a data 1 � menor ou igual a data 2
	 * 
	 * @param dt1 Date
	 * @param d2 Date
	 * @return boolean
	 */
	public boolean data1MenorIgualData2(Date dt1, Date d2) {
		return ((dt1.compareTo(d2) < 0) || (dt1.compareTo(d2) == 0));
	}

	/**
	 * Verifica se � ano bissexto
	 * 
	 * @param ano int
	 * @return boolean
	 */

	public  boolean isAnoBissexto(int ano) {
		return new GregorianCalendar().isLeapYear(ano);
	}

	/**
	 * Retorna o ano
	 * 
	 * @param data Date
	 * @return int
	 */

	public  int getAno(Date data) {

		Calendar calendario = Calendar.getInstance();
		int retorno=0;
		try{
			calendario.setTimeZone(TIMEZONE);
			calendario.setTime(data);
			retorno = calendario.get(Calendar.YEAR);
		}catch (Exception e) {
			e.printStackTrace();
		}	
		return retorno;
	}
	/**
	 * Retorna o ano
	 * 
	 * @param data Date
	 * @return int
	 */

	public  int getHoras(Date data) {
		Calendar calendario = Calendar.getInstance();
		calendario.setTimeZone(TimeZone.getTimeZone("GMT-2"));
		calendario.setTime(data);
		return calendario.get(Calendar.HOUR);
	}

	public  int getHorasSubstring(Date data) {
		int retorno = 0;
		if(data.toString().length() > 10){
			retorno = new Integer(data.toString().substring(11,13)).intValue();
		}
		return retorno;
	}
	/**
	 * Retorna o ano
	 * 
	 * @param data Date
	 * @return int
	 */

	public  int getMinutos(Date data) {
		Calendar calendario = Calendar.getInstance();
		calendario.setTime(data);
		return calendario.get(Calendar.MINUTE);
	}
	/**
	 * Retorna o ano
	 * 
	 * @param data Date
	 * @return int
	 */

	public  int getSegundos(Date data) {
		Calendar calendario = Calendar.getInstance();
		calendario.setTime(data);
		return calendario.get(Calendar.SECOND);
	}

	/**
	 * Retorna o mes
	 * 
	 * @param data Date
	 * @return long
	 */

	public  long getMes(Date data) {
		Calendar calendario = Calendar.getInstance();
		calendario.setTime(data);
		return calendario.get(Calendar.MONTH) + 1;
	}

	/**
	 * Retorna o dia
	 * 
	 * @param data Date
	 * @return long
	 */

	public  long getDia(Date data) {
		Calendar calendario = Calendar.getInstance();
		calendario.setTime(data);
		return calendario.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * Retorna o mes extenso
	 * 
	 * @param arg2 Long
	 * @return String
	 */

	public  String getMesExtenso(Long arg2) {
		Calendar calendario = Calendar.getInstance();
		calendario.set(Calendar.DAY_OF_MONTH, 1);
		calendario.set(Calendar.MONTH, arg2.intValue() - 1);
		SimpleDateFormat formatador = new SimpleDateFormat("MMMMMM",new Locale("pt","BR"));
		return formatador.format(calendario.getTime());
	}

	/**
	 * Retorna is Same Day
	 * 
	 * @param date2Compare Date
	 * @param datesList Date...
	 * @return boolean
	 */
	public  boolean isSameDay(Date date2Compare, Date... datesList) {
		boolean retorno = false;
		Calendar cal1 = GregorianCalendar.getInstance();
		cal1.setTime(date2Compare);

		for (int i = 0; i < datesList.length; i++) {
			Calendar cal2 = GregorianCalendar.getInstance();
			cal2.setTime(datesList[i]);
			if (cal1.get(Calendar.DAY_OF_MONTH) == cal2
					.get(Calendar.DAY_OF_MONTH)) {
				retorno = true;
			}
		}
		return retorno;
	}

	/**
	 * Retorna is Same Day
	 * 
	 * @param date2Compare Date
	 * @param startDate Date
	 * @param endDate Date
	 * @return boolean
	 */

	public  boolean isSameDay(Date date2Compare, Date startDate,
			Date endDate) {
		boolean retorno = false;
		Calendar cal1 = GregorianCalendar.getInstance();
		cal1.setTime(date2Compare);

		Calendar cal2 = GregorianCalendar.getInstance();
		cal2.setTime(startDate);

		Calendar calEndDate = GregorianCalendar.getInstance();
		calEndDate.setTime(endDate);

		while (cal2.get(Calendar.DAY_OF_MONTH) <= calEndDate
				.get(Calendar.DAY_OF_MONTH)) {
			if (cal1.get(Calendar.DAY_OF_MONTH) == cal2
					.get(Calendar.DAY_OF_MONTH)) {
				retorno = true;
			}
			cal2.add(Calendar.DAY_OF_YEAR, 1);
		}

		return retorno;
	}

	/**
	 * Compara Data Hora minuto
	 * 
	 * @param cal1 Calendar
	 * @param cal2 Calendar
	 * @return int
	 */

	public  int comparaDataHoraMinuto(Calendar cal1, Calendar cal2) {
		int retorno;
		if ((cal1 == null) || (cal2 == null)) {
			retorno = -1;
		} else {
			cal1.set(Calendar.SECOND, 0);
			cal1.set(Calendar.MILLISECOND, 0);
			cal2.set(Calendar.SECOND, 0);
			cal2.set(Calendar.MILLISECOND, 0);
			retorno = cal1.compareTo(cal2);
		}
		return retorno;
	}

	/**
	 * Retorna data ano mes dia
	 * 
	 * @param date Date
	 * @return Date
	 */

	public  Date getDataAnoMesDia(Date date) {
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(date);

		cal1.set(Calendar.HOUR_OF_DAY, 0);
		cal1.set(Calendar.MINUTE, 0);
		cal1.set(Calendar.SECOND, 0);
		cal1.set(Calendar.MILLISECOND, 0);
		return cal1.getTime();
	}

	@SuppressWarnings("deprecation")
	public Date getDataPorStringAAAMMDD(String valor)throws Exception{
		Date retorno = null;
		if(!this.utilString.vazio(valor)&&(valor.replaceAll(" ","").length() ==8)){
			retorno = new Date((valor.substring(4,6))+"/"+valor.substring(6,8)+"/"+(valor.substring(0,4)));
			//2011/02/0216:31:00+00
		}else if(!this.utilString.vazio(valor)&&(valor.replaceAll(" ","").length() ==21)){
			DateFormat dataFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			retorno = dataFormat.parse(valor.substring(8,10)+"/"+(valor.substring(5,7))+"/"+(valor.substring(0,4))+" "+(valor.substring(10,18)));
		}
		return retorno;
	}

	public String getTimeZone(String valor){
		String retorno = "";
		if(valor.length() > 18){
			retorno = valor.substring(18,valor.length());
		}
		return retorno;
	}

	//Calcular difereça horas, minutos, segundos(retorno String)
	public String getDiferencaHorasMinutosSegundos(Date dataMaior,Date dataMenor){
		UtilString utilString = new UtilString();
		long segundos = (dataMaior.getTime() - dataMenor.getTime()) / 1000;
		long horas = (long)Math.floor(segundos / 3600);
		segundos -= horas * 3600;
		long minutos = (long)Math.floor(segundos / 60);
		segundos -= minutos * 60;
		return utilString.completaComZerosAEsquerda(String.valueOf(horas), 2) +":"+utilString.completaComZerosAEsquerda(String.valueOf(minutos), 2)+":"+utilString.completaComZerosAEsquerda(String.valueOf(segundos), 2);
	}
	
	//Calcular difereça horas, minutos, segundos (retorno Long)
		public Long getDiferencaHorasMinutosSegundosLong(Date dataMaior,Date dataMenor){
			long segundos = (dataMaior.getTime() - dataMenor.getTime()) / 1000;
			long horas = (long)Math.floor(segundos / 3600);
			segundos -= horas * 3600;
			long minutos = (long)Math.floor(segundos / 60);
			segundos -= minutos * 60;
			return segundos;
		}
	
	
	//Calcular difereça horas, minutos, segundos de forma correta(segundos)-(retorno String)
	public String getDiferencaHorasMinutosSegundosArrumado(Date dataMaior,Date dataMenor) throws ParseException{
		UtilString utilString = new UtilString();
		SimpleDateFormat d = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'.0Z'"); 
		
		String pattern = "yyyy-MM-dd'T'HH:mm:ss'.0Z'";  
		
		String dataArrumada = d.format(dataMaior); 
		DateFormat df = new SimpleDateFormat(pattern);  
		Date dateMaiorArumada = df.parse(dataArrumada);
		
		String dataArrumadaMenor = d.format(dataMenor); 
		DateFormat dfm = new SimpleDateFormat(pattern);  
		Date dateMenorArumadarMenor = dfm.parse(dataArrumadaMenor);
		
		 long differenceMilliSeconds = dateMaiorArumada.getTime() - dateMenorArumadarMenor.getTime(); 
		 long horas =  (differenceMilliSeconds/1000/60/60);
		 long minutos= (differenceMilliSeconds/1000/60);
		 if(minutos > 60){
			 minutos = minutos - 60;
		 }
		 long segundos= (differenceMilliSeconds/1000)% 60;
		 if(segundos > 60){
			 segundos = segundos - 60;
		 }
      return utilString.completaComZerosAEsquerda(String.valueOf(horas), 2) +":"+utilString.completaComZerosAEsquerda(String.valueOf(minutos), 2)+":"+utilString.completaComZerosAEsquerda(String.valueOf(segundos), 2); 

	}

	/**
	 * Metodo para converter segundos (Horas)  em formato hh:mm:ss
	 * 
	 * */
	public String formatarHora(Integer hora) {

		Integer ss = hora % 60;  
		hora /= 60;  
		Integer min =  hora % 60;  
		hora /= 60;  
		Integer hh =  hora % 24;  
		return strzero(hh) + ":" + strzero(min) + ":" + strzero(ss);  
	}  

	private String strzero(int n)  
	{  
		if(n < 10)  
			return "0" + String.valueOf(n);  
		return String.valueOf(n);  
	}  

	/**
	 * Metodo para verificar se uma data é valida
	 * 
	 * */
	
	public boolean isDate(String dateStr) {  
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");  
		Calendar cal = new GregorianCalendar();  

		// gerando o calendar  
		try {
			cal.setTime(df.parse(dateStr));
			// separando os dados da string para comparacao e validacao  
			String[] data = dateStr.split("/");  
			String dia = data[0];  
			String mes = data[1];  
			String ano = data[2];  

			// testando se hah discrepancia entre a data que foi  
			// inserida no caledar e a data que foi passada como  
			// string. se houver diferenca, a data passada era  
			// invalida  
			if ( (new Integer(dia)).intValue() != (new  
					Integer(cal.get(Calendar.DAY_OF_MONTH))).intValue() ) {  
				// dia nao casou  
				return false;  
			} else if ( (new Integer(mes)).intValue() != (new  
					Integer(cal.get(Calendar.MONTH)+1)).intValue() ) {  
				// mes nao casou  
				return false;  
			} else if ( (new Integer(ano)).intValue() != (new  
					Integer(cal.get(Calendar.YEAR))).intValue() ) {  
				// ano nao casou  
				return false;  
			}  

			return true;   
		} catch (ParseException e) {
			e.printStackTrace();
			return false;
		}  
	}
	
	public static Date converterLocalDateTimeParaDate(LocalDateTime localDate) {
		if (localDate != null) {
			return Date.from(localDate.atZone(ZoneId.systemDefault()).toInstant());
		}
		return null;
	}
	
	public LocalDate converterDateLocalDate(Date data) {
		return Instant.ofEpochMilli(data.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
	}
	
	public LocalDateTime converterDateLocalDateTime(Date data) {
		return Instant.ofEpochMilli(data.getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
	}
	
	public static void main(String[] args) {
		UtilData utilData = new UtilData();
		utilData.getMesExtenso(utilData.getMes(new Date()));
		System.out.println("Mes atual ="+utilData.getMesExtenso(utilData.getMes(new Date())));
	}
	
	public  Date ajustaData(Date data, int dia,int mes, int horas, int minutos, int segundos) {
		Calendar calendar = null;
		try {
			if (data != null) {
				calendar = Calendar.getInstance();
				calendar.setTime(data);
				calendar.set(Calendar.DAY_OF_MONTH, dia);
				calendar.set(Calendar.MONTH, mes);
				calendar.set(Calendar.HOUR_OF_DAY, horas);
				calendar.set(Calendar.MINUTE, minutos);
				calendar.set(Calendar.SECOND, segundos);
				data = calendar.getTime();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}
	public  Date ajustaData(Date data, int dia,int mes,int ano, int horas, int minutos, int segundos) {
		Calendar calendar = null;
		try {
			if (data != null) {
				calendar = Calendar.getInstance();
				calendar.setTime(data);
				calendar.set(Calendar.DAY_OF_MONTH, dia);
				calendar.set(Calendar.MONTH, mes);
				calendar.set(Calendar.YEAR, ano);
				calendar.set(Calendar.HOUR_OF_DAY, horas);
				calendar.set(Calendar.MINUTE, minutos);
				calendar.set(Calendar.SECOND, segundos);
				data = calendar.getTime();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}
	
	public Date ajustarPrimeiroDiaMes(Date date){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return ajustaData(date, 1, 0, 0, 0);
	}
	
	public Date ajustarUltimoDiaMes(Date date){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return ajustaData(date, calendar.getActualMaximum(Calendar.DAY_OF_MONTH), 23, 59, 59);
	}
	
	
	public Date ajustarPrimeiroDiaAno(Date date){
		return ajustaData(date, 1, 1, 0, 0, 0);
	}
	
	public Date ajustarUltimoDiaAno(Date date){
		return ajustaData(date, 31, 12, 23, 59, 59);
	}
	
	public String getAnoCorrente(Date mes) {
		SimpleDateFormat f = new SimpleDateFormat("YYYY");
		return f.format(mes);
	}
	
	public String getMesCorrente(Date mes) {
		SimpleDateFormat f = new SimpleDateFormat("MM");
		return f.format(mes);
	}
	
	
	public String obterNomeMes(int mes){
	    String[] meses = {"01 Janeiro", "02 Fevereiro", "03 Março", "04 Abril", "05 Maio", "06 Junho", "07 Julho", 
	                      "08 Agosto", "09 Setembro", "10 Outubro", "11 Novembro", "12 Dezembro"};
	    return meses[mes-1];
	}
	
	public Date toDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }
}


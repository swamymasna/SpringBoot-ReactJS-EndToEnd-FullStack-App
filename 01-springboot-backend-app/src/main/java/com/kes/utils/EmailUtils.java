package com.kes.utils;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class EmailUtils {

	private JavaMailSender javaMailSender;

	public String sendEmail(String to, String subject, String body) {

		String sentMail = null;

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();

			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
			messageHelper.setTo(to);
			messageHelper.setSubject(subject);
			messageHelper.setText(body);

			javaMailSender.send(messageHelper.getMimeMessage());

			sentMail = "Email Sent Successfully";

		} catch (Exception e) {

			sentMail = "Error Occured While Sending Email..??";
			e.printStackTrace();
		}

		return sentMail;
	}
}

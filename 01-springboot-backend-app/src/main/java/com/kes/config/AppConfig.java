package com.kes.config;

import java.util.Properties;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class AppConfig {

	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}

	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

	@Bean
	public JavaMailSender javaMailSender() {

		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.gmail.com");
		mailSender.setPort(587);

		mailSender.setUsername("swamymasna55@gmail.com");
		mailSender.setPassword("aqhvtgtcogekywfs");

		Properties properties = mailSender.getJavaMailProperties();
		properties.put("mail.smtp.auth", true);
		properties.put("mail.smtp.starttls.enable", true);

		return mailSender;
	}
}

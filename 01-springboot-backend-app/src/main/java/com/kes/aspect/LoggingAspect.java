package com.kes.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Aspect
@Slf4j
@AllArgsConstructor
public class LoggingAspect {

	private ObjectMapper objectMapper;

	@Pointcut(value = "execution(* com.kes.service.*.*(..))")
	public void servicePointcut() {

	}

	@Pointcut(value = "execution(* com.kes.controller.*.*(..))")
	public void controllerPointcut() {

	}

	@Around(value = "servicePointcut() || controllerPointcut()")
	public Object loggingAdvice(ProceedingJoinPoint pjp) throws Throwable {

		String methodName = pjp.getSignature().getName();

		String className = pjp.getTarget().getClass().getName();

		Object[] args = pjp.getArgs();

		log.info("Invoked Method : " + className + " : " + methodName + "() " + "With Arguments : "
				+ objectMapper.writeValueAsString(args));

		Object object = pjp.proceed();

		log.info("Returning Back From : " + className + " : " + methodName + "() " + "Response : "
				+ objectMapper.writeValueAsString(object));

		return object;
	}
}

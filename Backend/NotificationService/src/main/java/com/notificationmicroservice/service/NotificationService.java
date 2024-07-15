package com.notificationmicroservice.service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.notificationmicroservice.entity.Notification;
import com.notificationmicroservice.repository.NotificationRepository;

@Service
public class NotificationService {

	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private NotificationRepository notificationRepo;

	public void sendTestEmail(String to) {
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

			helper.setTo(to);
			String subject = "Welcome to HeHe Giggle! 🎉";
			String emailBody = "<html><body>"
                    + "<h1>Hello,</h1>"
                    + "<p>Welcome to <b>HeHe Giggle!</b> You are now a part of our vibrant community where you can share epic fails, life updates, and more with the world. Get ready for some fun!</p>"
                    + "<p>To get started, log in with your credentials and start exploring.</p>"
                    + "<p>If you have any questions or need assistance, feel free to reach out to our support team.</p>"
                    + "<p>Stay awesome and keep posting!</p>"
                    + "<p>Cheers,</p>"
                    + "<p><b>Team HeHe Giggle</b></p>"
                    + "</body></html>";

			helper.setSubject(subject);
			helper.setText(emailBody, true);
			javaMailSender.send(mimeMessage);
			Notification notification = new Notification();
			notification.setEmail(to);
			notification.setMessage(emailBody);
			notification.setSubject(subject);
			
			notificationRepo.save(notification);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
}
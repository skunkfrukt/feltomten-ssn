;$(document).ready(function() {
	function generateRandomDate() {
		var now = new Date();
		var randomDate = new Date(Math.floor(Math.random() * now.getTime()));
		return randomDate;
	}
	
	function generateRandomSerialNumber() {
		var serialNumberString = Math.floor(Math.random() * 1000).toString();
		
		while (serialNumberString.length < 3) {
			serialNumberString = "0" + serialNumberString;
		}
		
		return serialNumberString;
	}
	
	function calculateDigitSum(n) {
		if (n < 100) {
			return Math.floor(n / 10) + (n % 10);
		}
		var nString = n.toString();
		var sum = 0;
		for (var i = 0; i < nString.length; i++) {
			sum += parseInt(nString[i]);
		}
		return sum;
	}
	
	function calculateSSNChecksum(partialSSN) {
		if (partialSSN.length !== 9 && partialSSN.length !== 11) {
			throw new Error("Invalid partial SSN!!");
		}
		var checksum = 0;
		for (var i = partialSSN.length - 9; i < partialSSN.length; i++) {
			checksum += calculateDigitSum(parseInt(partialSSN[i]) * (2 - (i % 2)));
		}
		checksum = (10 - (checksum % 10)) % 10;
		return checksum;
	}
	
	function generateRandomSSN() {
		var birthDate = generateRandomDate();
		var partialSSN = birthDate.getFullYear().toString();
		var month = birthDate.getMonth() + 1;
		partialSSN += (month < 10 ? "0" : "") + month.toString();
		var day = birthDate.getDate();
		partialSSN += (day < 10 ? "0" : "") + day.toString();
		
		var serialNumber = generateRandomSerialNumber();
		partialSSN += serialNumber.toString();
		
		var checksum = calculateSSNChecksum(partialSSN);
		var socialSecurityNumber = partialSSN + checksum.toString();
		
		return socialSecurityNumber;
	}

	$("#ssn-button").click(function() {
		$("#ssn-output").val(generateRandomSSN());
	});

	console.log("sabla krafs");
});

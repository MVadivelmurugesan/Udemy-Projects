public with sharing class CurrencyConverter {
    @AuraEnabled(cacheable=true)
    public static Decimal convertCurrency(String countryFrom, String countryTo, Decimal amount) {
        // Replace with your actual API key
        String apiKey = '31a576f91b915a36f4c715bd';
        String baseUrl = 'https://v6.exchangerate-api.com/v6/';
        String endpoint = baseUrl+apiKey+'/pair/'+countryFrom+'/'+countryTo+'/'+amount;
        
        Decimal result = 0;
        
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(endpoint);
            request.setMethod('GET');
            
            HttpResponse response = http.send(request);
            
            if (response.getStatusCode() == 200) {
                Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                
                // Use 'conversion_result' to get actual converted value
                if (jsonResponse.containsKey('conversion_result')) {
                    result = (Decimal)jsonResponse.get('conversion_result');
                     System.debug('result: ' + result);
                }
            } else {
                System.debug('Callout failed: ' + response.getStatus());
            }
        } catch (Exception e) {
            System.debug('Error during currency conversion: ' + e.getMessage());
        }
        
        return result;
    }
}
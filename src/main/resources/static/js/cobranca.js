$('#confirmacaoExclusaoModal').on('show.bs.modal', function(event){
	var button = $(event.relatedTarget);
	
	var codigoTitulo = button.data('codigo');
	var descricaoTitulo = button.data('descricao');
	
	var modal = $(this); // armazena o objeto do modal
	var form = modal.find('form'); // seleciona o formulário
	var action = form.data('url-base');  // seleciona a string do Action
	if(!action.endsWith('/')){
		action += '/';
	}
	
	form.attr('action', action + codigoTitulo);
	
	modal.find('.modal-body span').html('Tem certeza que deseja excluir o título <strong>' + descricaoTitulo + '</strong>?');
});

$(function(){
	// executa quando a página acaba de carregar
	//$(['rel="tooltip"']): procure os componetes que são tooltip
	$('[rel="tooltip"]').tooltip();
	$('.js-currency').maskMoney({decimal: ',', thousands: '.', allowZero: true});
	$('.js-atualizar-status').on('click', function(event){
		event.preventDefault(); // não faz o comportamento padrão do link - GET
		var botaoReceber = $(event.currentTarget); // quem disparou o evento
		var urlReceber = botaoReceber.attr('href')
		
		var response = $.ajax({
			url: urlReceber,
			type: 'PUT'
		})
		
		response.done(function(e){
			var codigoTitulo = botaoReceber.data('codigo');
			$('[data-role='+ codigoTitulo + ']').html('<span class="label label-success">'+ e + '</span>')
			botaoReceber.hide();
		})
		
		response.fail(function(){
			console.log(e);
			alert("Erro recebendo cobrança");
		})
		
		//console.log('urlReceber:', urlReceber);
	})
})
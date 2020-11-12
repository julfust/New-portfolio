// =======================================================
// ======== Fonctions utilitaires pour l'exercice ========
// ====== Vous n'avez pas besoin d'éditer ce fichier =====
// =======================================================

/**
 * Créér et affiche des boutons d'action dans la page web
 */
export function initActionButtons(onPause, onResume, onCancel) {
    $('#action-buttons').empty();
    $('<button id="pause" class="btn btn-info btn-sm">⏸ Pause</button>').on('click', onPause).appendTo('#action-buttons');
    $('<button id="resume" class="btn btn-success btn-sm">▶ Reprendre</button>').on('click', onResume).appendTo('#action-buttons');
    $('<button id="cancel" class="btn btn-danger btn-sm">✖ Annuler</button>').on('click', onCancel).appendTo('#action-buttons');
}

/**
 * Réinitialise et affiche la barre de progression dans la page web.
 * Exemple d'utilisation :  initProgressBar();
 */
export function initProgressBar() {
    $('#progress').removeClass('bg-success bg-danger progress-bar-striped progress-bar-animated').text('');
    $('#progress-container').removeClass('d-none').show();
}

/**
 * Change la valeur de progression de la barre.
 * Exemple d'utilisation :  updateProgressBar(42);
 *   ..va définir la progression à 42%
 */
export function updateProgressBar(percentValue) {
    $('#progress').attr('aria-valuenow', percentValue)
                    .css('width', `${percentValue}%`);
}

/**
 * Définit la barre de progression en mode "Téléchargement annulé"
 * Exemple d'utilisation :  cancelProgressBar();
 */
export function cancelProgressBar() {
    $('#progress').addClass('bg-danger progress-bar-striped').text('Téléchargement annulé !');
}
/**
 * Définit 1 fois sur 2 la barre de progression en mode "Pause"
 * Exemple d'utilisation :  playPauseProgressBar();
 */
export function playPauseProgressBar() {
    const text = $('#progress').text();
    $('#progress')
        .toggleClass('progress-bar-striped progress-bar-animated')
        .text(text !== 'Pause' ? 'Pause' : '');
}

/**
 * Définit la barre de progression sur 100% avec une indication "téléchargement terminé"
 */
export function successProgressBar() {
    updateProgressBar(100);
    $('#progress')
            .removeClass('bg-danger')
            .addClass('bg-success')
            .text('Téléchargement terminé !');
}
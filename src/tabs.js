export const init = () => {
    document.addEventListener('DOMContentLoaded', function () {
        // Get all "tabs li" elements
        const $liTabs = Array.prototype.slice.call(document.querySelectorAll('.tabs li'), 0);
        if ($liTabs.length === 0) return
        $liTabs.map($el => {
            $el.addEventListener('click', () => {
                if($el.classList.contains('is-active')) return
                
                const target = $el.dataset.target;
                const $target = document.getElementById(target)
                $liTabs.filter($liTabs => $liTabs !== $el && $liTabs.classList.contains('is-active'))
                       .map(el => {
                           el.classList.toggle('is-active')
                       }); 
                $el.classList.toggle('is-active');
                $target.classList.toggle('hidden')
            })
        })
    })
}
class Giphy < Liquid::Tag
  Syntax = /^\s*(\w+)\s*$/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

    else
      raise "No Giphy ID provided in the \"giphy\" tag"
    end
  end

  def render(context)

    # Embed:  https://giphy.com/embed/TseBjMu53JgWc
    # Source: https://media.giphy.com/media/TseBjMu53JgWc/giphy.gif

    # .giphy {
    #   margin: 2em 0;
    #   padding: 0;
    # }
    # .giphy video {
    #   display: block;
    #   width: 100%;
    #   max-width: 500px;
    #   margin: 0 auto;
    # }

    cloudinaryPrefix = "https://res.cloudinary.com/nho/image/fetch"
    giphyImage = "https://media.giphy.com/media/#{@id}/giphy.gif"
    poster = "#{cloudinaryPrefix}/f_jpg/#{giphyImage}"
    mp4Source = "<source src=\"#{cloudinaryPrefix}/f_mp4/#{giphyImage}\" type=\"video/mp4\">"
    webmSource = "<source src=\"#{cloudinaryPrefix}/f_webm/#{giphyImage}\" type=\"video/mp4\">"
    videoTag = "<video autoplay loop muted playsinline poster=\"#{poster}\">#{mp4Source}#{webmSource}<img src=\"#{giphyImage}\" alt=\"\" /></video>"

    return "<div class=\"giphy\">#{videoTag}</div>"

  end

  Liquid::Template.register_tag "giphy", self
end

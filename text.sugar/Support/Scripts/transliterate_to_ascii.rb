#!/usr/bin/env ruby
require 'iconv'
class String
	def to_ascii_iconv
		converter = Iconv.new('ASCII//IGNORE//TRANSLIT', 'UTF-8')
		converter.iconv(self).unpack('U*').select{ |cp| cp < 127 }.pack('U*')
	end
end
print STDIN.read.to_ascii_iconv